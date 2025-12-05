// ============================================
// Background Service Worker
// ============================================
// Handles extension-wide state and communication

import { ExtensionMessage, ExtensionState } from './types/models';

// ============================================
// State Management
// ============================================

let extensionState: ExtensionState = {
  currentCaseId: null,
  currentCase: null,
  autofillState: 'idle',
  currentHost: null,
  detectedCarrier: null,
  lastError: null,
  currentPageIdentifier: null,
};

// ============================================
// Message Handling from Content Script
// ============================================

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, sender, sendResponse) => {
    console.log('[Background] Received message:', message.type, 'from:', sender.tab?.url);

    switch (message.type) {
      case 'MFA_DETECTED':
        extensionState.autofillState = 'paused';
        extensionState.lastError = 'MFA verification required';
        // Badge to alert user
        if (sender.tab?.id) {
          chrome.action.setBadgeText({ text: 'MFA', tabId: sender.tab.id });
          chrome.action.setBadgeBackgroundColor({ color: '#D97706', tabId: sender.tab.id });
        }
        sendResponse({ received: true });
        break;

      case 'PAGE_COMPLETED':
        const payload = message.payload as { pageId: string };
        extensionState.currentPageIdentifier = payload.pageId;
        extensionState.lastError = null;
        sendResponse({ received: true });
        break;

      case 'AUTOFILL_ERROR':
        const errorPayload = message.payload as { message: string };
        extensionState.autofillState = 'error';
        extensionState.lastError = errorPayload.message;
        // Badge to alert user
        if (sender.tab?.id) {
          chrome.action.setBadgeText({ text: '!', tabId: sender.tab.id });
          chrome.action.setBadgeBackgroundColor({ color: '#DC2626', tabId: sender.tab.id });
        }
        sendResponse({ received: true });
        break;

      case 'AUTOFILL_COMPLETE':
        extensionState.autofillState = 'completed';
        extensionState.lastError = null;
        // Badge to show completion
        if (sender.tab?.id) {
          chrome.action.setBadgeText({ text: '✓', tabId: sender.tab.id });
          chrome.action.setBadgeBackgroundColor({ color: '#059669', tabId: sender.tab.id });
        }
        sendResponse({ received: true });
        break;

      case 'GET_STATE':
        sendResponse({ state: extensionState });
        break;

      case 'API_REQUEST':
        // Proxy API requests from content scripts to avoid CORS
        handleApiRequest(message.payload as { url: string; options: RequestInit })
          .then((result) => sendResponse(result))
          .catch((error) => sendResponse({ error: error.message }));
        return true; // Keep channel open for async

      default:
        sendResponse({ error: 'Unknown message type' });
    }

    return true;
  }
);

// ============================================
// API Request Handler
// ============================================

async function handleApiRequest(payload: { url: string; options: RequestInit }): Promise<{ data?: unknown; error?: string }> {
  try {
    const response = await fetch(payload.url, {
      ...payload.options,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || `HTTP ${response.status}` };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

// ============================================
// Tab Events
// ============================================

// Clear badge when tab is closed or navigated away
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.action.setBadgeText({ text: '', tabId });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    // Clear badge when navigating
    chrome.action.setBadgeText({ text: '', tabId });
  }
});

// ============================================
// Installation / Update
// ============================================

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[Background] Extension installed');
  } else if (details.reason === 'update') {
    console.log('[Background] Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

console.log('[Background] Service worker initialized');

