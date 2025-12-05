// ============================================
// Popup Script - Extension UI Logic
// ============================================

import { CaseWithCarriers, CarrierPlatform } from '../types/models';
import { fetchCase, checkAuth } from '../api/client';

// ============================================
// DOM Elements
// ============================================

const elements = {
  hostName: document.getElementById('hostName') as HTMLElement,
  carrierBadge: document.getElementById('carrierBadge') as HTMLElement,
  authSection: document.getElementById('authSection') as HTMLElement,
  authStatus: document.getElementById('authStatus') as HTMLElement,
  authText: document.getElementById('authText') as HTMLElement,
  caseSection: document.getElementById('caseSection') as HTMLElement,
  caseIdInput: document.getElementById('caseIdInput') as HTMLInputElement,
  fetchCaseBtn: document.getElementById('fetchCaseBtn') as HTMLButtonElement,
  caseDetails: document.getElementById('caseDetails') as HTMLElement,
  clientName: document.getElementById('clientName') as HTMLElement,
  caseStatus: document.getElementById('caseStatus') as HTMLElement,
  coverageInfo: document.getElementById('coverageInfo') as HTMLElement,
  statusSection: document.getElementById('statusSection') as HTMLElement,
  statusMessage: document.getElementById('statusMessage') as HTMLElement,
  actionsSection: document.getElementById('actionsSection') as HTMLElement,
  startBtn: document.getElementById('startBtn') as HTMLButtonElement,
  pauseBtn: document.getElementById('pauseBtn') as HTMLButtonElement,
  resumeBtn: document.getElementById('resumeBtn') as HTMLButtonElement,
  notCarrierSection: document.getElementById('notCarrierSection') as HTMLElement,
};

// ============================================
// State
// ============================================

let currentCaseData: CaseWithCarriers | null = null;
let detectedCarrier: CarrierPlatform | null = null;
let currentTabId: number | null = null;
let isAuthenticated = false;

// ============================================
// Carrier Detection
// ============================================

const CARRIER_HOSTS: Record<string, CarrierPlatform> = {
  'ipipeline.com': 'iPipeline',
  'americo.com': 'Americo',
};

function detectCarrier(hostname: string): CarrierPlatform | null {
  for (const [pattern, carrier] of Object.entries(CARRIER_HOSTS)) {
    if (hostname.includes(pattern)) {
      return carrier;
    }
  }
  return null;
}

// ============================================
// UI Updates
// ============================================

function showSection(element: HTMLElement, show: boolean) {
  if (show) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

function setStatusMessage(message: string, type: 'info' | 'warning' | 'error' | 'success') {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status-message ${type}`;
  showSection(elements.statusSection, true);
}

function updateCaseDisplay(caseData: CaseWithCarriers) {
  const { client } = caseData;
  elements.clientName.textContent = `${client.firstName} ${client.lastName}`;
  elements.coverageInfo.textContent = `$${caseData.coverageAmount.toLocaleString()} · ${caseData.termLengthYears} year term`;

  // Find carrier status if on a carrier site
  if (detectedCarrier) {
    const carrierStatus = caseData.carriers.find(
      (c) => c.carrierPlatform === detectedCarrier
    );
    if (carrierStatus) {
      elements.caseStatus.textContent = carrierStatus.status.replace('_', ' ');
      elements.caseStatus.className = `status-badge ${carrierStatus.status}`;
    }
  }

  showSection(elements.caseDetails, true);
}

function updateButtonStates(state: 'idle' | 'running' | 'paused' | 'error') {
  showSection(elements.startBtn, state === 'idle');
  showSection(elements.pauseBtn, state === 'running');
  showSection(elements.resumeBtn, state === 'paused' || state === 'error');
}

// ============================================
// Event Handlers
// ============================================

async function handleFetchCase() {
  const caseId = elements.caseIdInput.value.trim();
  if (!caseId) {
    setStatusMessage('Please enter a Case ID', 'warning');
    return;
  }

  elements.fetchCaseBtn.disabled = true;
  elements.fetchCaseBtn.textContent = 'Loading...';

  const result = await fetchCase(caseId);

  elements.fetchCaseBtn.disabled = false;
  elements.fetchCaseBtn.textContent = 'Load';

  if (result.error) {
    setStatusMessage(`Error: ${result.error}`, 'error');
    showSection(elements.caseDetails, false);
    showSection(elements.actionsSection, false);
    return;
  }

  if (result.data) {
    currentCaseData = result.data;
    updateCaseDisplay(currentCaseData);
    showSection(elements.statusSection, false);

    // Show actions if on a carrier site
    if (detectedCarrier) {
      showSection(elements.actionsSection, true);
      updateButtonStates('idle');
    }
  }
}

async function handleStartAutofill() {
  if (!currentCaseData || !currentTabId || !detectedCarrier) return;

  elements.startBtn.disabled = true;

  try {
    // Send message to content script
    await chrome.tabs.sendMessage(currentTabId, {
      type: 'START_AUTOFILL',
      payload: { caseData: currentCaseData },
    });

    updateButtonStates('running');
    setStatusMessage('Autofill running...', 'info');
  } catch (error) {
    console.error('[Popup] Error starting autofill:', error);
    setStatusMessage('Failed to start autofill. Make sure you\'re on a supported page.', 'error');
  }

  elements.startBtn.disabled = false;
}

async function handlePause() {
  if (!currentTabId) return;

  await chrome.tabs.sendMessage(currentTabId, { type: 'PAUSE_AUTOFILL' });
  updateButtonStates('paused');
  setStatusMessage('Autofill paused', 'warning');
}

async function handleResume() {
  if (!currentTabId) return;

  await chrome.tabs.sendMessage(currentTabId, { type: 'RESUME_AUTOFILL' });
  updateButtonStates('running');
  setStatusMessage('Autofill resumed...', 'info');
}

// ============================================
// Initialization
// ============================================

async function init() {
  // Get current tab info
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.url) {
    elements.hostName.textContent = 'No page detected';
    return;
  }

  currentTabId = tab.id || null;

  try {
    const url = new URL(tab.url);
    elements.hostName.textContent = url.hostname;

    // Detect carrier
    detectedCarrier = detectCarrier(url.hostname);

    if (detectedCarrier) {
      elements.carrierBadge.textContent = detectedCarrier;
      elements.carrierBadge.classList.remove('hidden');
      showSection(elements.notCarrierSection, false);
    } else {
      showSection(elements.notCarrierSection, true);
    }
  } catch {
    elements.hostName.textContent = 'Invalid URL';
  }

  // Check authentication
  const authResult = await checkAuth();
  isAuthenticated = !!authResult.data?.user;

  if (isAuthenticated) {
    elements.authStatus.className = 'auth-status authenticated';
    elements.authText.textContent = `Signed in as ${authResult.data?.user?.email}`;
    showSection(elements.caseSection, true);
  } else {
    elements.authStatus.className = 'auth-status not-authenticated';
    elements.authText.textContent = 'Not signed in - open dashboard to login';
    showSection(elements.caseSection, false);
  }

  // Get state from content script if on carrier site
  if (detectedCarrier && currentTabId) {
    try {
      const response = await chrome.tabs.sendMessage(currentTabId, { type: 'GET_STATE' });
      if (response?.state && response.state !== 'idle') {
        updateButtonStates(response.state);
        if (response.caseId) {
          elements.caseIdInput.value = response.caseId;
          await handleFetchCase();
        }
      }
    } catch {
      // Content script might not be loaded yet
      console.log('[Popup] Content script not ready');
    }
  }
}

// ============================================
// Event Listeners
// ============================================

elements.fetchCaseBtn.addEventListener('click', handleFetchCase);
elements.caseIdInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleFetchCase();
});
elements.startBtn.addEventListener('click', handleStartAutofill);
elements.pauseBtn.addEventListener('click', handlePause);
elements.resumeBtn.addEventListener('click', handleResume);

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'MFA_DETECTED':
      setStatusMessage('MFA required. Enter the code and click Resume.', 'warning');
      updateButtonStates('paused');
      break;

    case 'PAGE_COMPLETED':
      setStatusMessage(`Page completed: ${message.payload?.pageId}`, 'info');
      break;

    case 'AUTOFILL_ERROR':
      setStatusMessage(`Error: ${message.payload?.message}`, 'error');
      updateButtonStates('error');
      break;

    case 'AUTOFILL_COMPLETE':
      setStatusMessage('Autofill completed!', 'success');
      updateButtonStates('idle');
      break;
  }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

