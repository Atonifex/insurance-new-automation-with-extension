// ============================================
// Content Script - Injected into carrier portals
// ============================================
// TODO: This will need serious edits and revisions based on actual
// carrier portal structures. Current implementation is a starting point.

import {
  CaseWithCarriers,
  ExtensionMessage,
  AutofillState,
  CarrierPlatform,
} from '../types/models';
import { getCarrierByHost, identifyPage } from './mapping';
import {
  fillField,
  detectMFA,
  clickButton,
  detectValidationErrors,
  waitFor,
} from './domUtils';
import { updateStatus } from '../api/client';

// ============================================
// State
// ============================================

let currentState: AutofillState = 'idle';
let currentCaseData: CaseWithCarriers | null = null;
let detectedCarrier: CarrierPlatform | null = null;

// ============================================
// Initialization
// ============================================

console.log('[Autofill] Content script loaded on:', window.location.hostname);

// Detect carrier on load
const carrierMapping = getCarrierByHost(window.location.hostname);
if (carrierMapping) {
  detectedCarrier = carrierMapping.platform;
  console.log('[Autofill] Detected carrier:', detectedCarrier);
}

// ============================================
// Message Handling
// ============================================

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, sendResponse) => {
    console.log('[Autofill] Received message:', message.type);

    switch (message.type) {
      case 'START_AUTOFILL':
        handleStartAutofill(message.payload as { caseData: CaseWithCarriers });
        sendResponse({ success: true });
        break;

      case 'PAUSE_AUTOFILL':
        currentState = 'paused';
        sendResponse({ success: true });
        break;

      case 'RESUME_AUTOFILL':
        if (currentState === 'paused' && currentCaseData) {
          currentState = 'running';
          runAutofillLoop();
        }
        sendResponse({ success: true });
        break;

      case 'GET_STATE':
        sendResponse({
          state: currentState,
          carrier: detectedCarrier,
          caseId: currentCaseData?.id || null,
        });
        break;

      default:
        sendResponse({ error: 'Unknown message type' });
    }

    return true; // Keep channel open for async response
  }
);

// ============================================
// Autofill Logic
// ============================================

async function handleStartAutofill(payload: { caseData: CaseWithCarriers }) {
  currentCaseData = payload.caseData;
  currentState = 'running';

  console.log('[Autofill] Starting with case:', currentCaseData.id);

  // Report status to backend
  if (detectedCarrier) {
    await updateStatus(
      currentCaseData.id,
      detectedCarrier,
      'in_progress',
      undefined,
      'Autofill started'
    );
  }

  // Start the autofill loop
  runAutofillLoop();
}

async function runAutofillLoop() {
  if (!currentCaseData || !carrierMapping) {
    console.log('[Autofill] No case data or carrier mapping');
    return;
  }

  while (currentState === 'running') {
    // Check for MFA
    const currentPage = identifyPage(carrierMapping, window.location.href);
    if (currentPage && detectMFA(currentPage.mfaIndicators)) {
      currentState = 'paused';
      await updateStatus(
        currentCaseData.id,
        carrierMapping.platform,
        'waiting_mfa',
        currentPage.id,
        'MFA verification required'
      );

      // Notify popup
      chrome.runtime.sendMessage({
        type: 'MFA_DETECTED',
        payload: { pageId: currentPage.id },
      });

      return;
    }

    // Identify current page
    if (!currentPage) {
      console.log('[Autofill] Unknown page, waiting for navigation...');
      await sleep(1000);
      continue;
    }

    console.log('[Autofill] Processing page:', currentPage.id);

    // Fill all fields for this page
    const errors: string[] = [];
    for (const fieldMapping of currentPage.fields) {
      const result = fillField(fieldMapping, currentCaseData);
      if (!result.success && result.error) {
        errors.push(`${result.field}: ${result.error}`);
      }
    }

    // Wait a moment for fields to settle
    await sleep(500);

    // Check for validation errors
    const validationErrors = detectValidationErrors();
    if (validationErrors.length > 0) {
      console.log('[Autofill] Validation errors:', validationErrors);
      currentState = 'paused';
      await updateStatus(
        currentCaseData.id,
        carrierMapping.platform,
        'error',
        currentPage.id,
        `Validation errors: ${validationErrors.join('; ')}`
      );

      chrome.runtime.sendMessage({
        type: 'AUTOFILL_ERROR',
        payload: {
          message: validationErrors.join('; '),
          pageIdentifier: currentPage.id,
        },
      });

      return;
    }

    // Report page completion
    await updateStatus(
      currentCaseData.id,
      carrierMapping.platform,
      'in_progress',
      currentPage.id,
      'Page filled successfully'
    );

    chrome.runtime.sendMessage({
      type: 'PAGE_COMPLETED',
      payload: { pageId: currentPage.id },
    });

    // Try to click next button
    if (currentPage.nextButtonSelector) {
      await sleep(300);
      const clicked = clickButton(currentPage.nextButtonSelector);

      if (clicked) {
        // Wait for navigation or page update
        console.log('[Autofill] Clicked next, waiting for page change...');
        await waitForPageChange();
      } else {
        console.log('[Autofill] Could not click next button, pausing');
        currentState = 'paused';
        await updateStatus(
          currentCaseData.id,
          carrierMapping.platform,
          'error',
          currentPage.id,
          'Could not find next button'
        );
        return;
      }
    } else {
      // No next button defined, we might be done or need manual intervention
      console.log('[Autofill] No next button defined for page');
      currentState = 'paused';
      return;
    }
  }
}

// ============================================
// Utility Functions
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPageChange(): Promise<void> {
  const currentUrl = window.location.href;

  // Wait for URL change or DOM change
  const changed = await waitFor(() => {
    return (
      window.location.href !== currentUrl ||
      document.readyState !== 'complete'
    );
  }, 10000);

  if (changed) {
    // Wait for new page to be ready
    await waitFor(() => document.readyState === 'complete', 5000);
    await sleep(500); // Extra buffer for JS to initialize
  }
}

// ============================================
// Test Autofill for Development
// ============================================
// This function can be called from the console for testing

(window as unknown as Record<string, unknown>).__testAutofill = (
  caseData: CaseWithCarriers
) => {
  handleStartAutofill({ caseData });
};

