// ============================================
// Shared Types for Chrome Extension
// These mirror the web-app types for consistency
// ============================================
// Imports shared types from web-app and adds extension-specific types

// Re-export shared types from web-app for convenience
export type {
  CaseCarrierStatus,
  SmokerStatus,
  Client,
  Case,
  CaseCarrier,
  CaseWithCarriers,
  CaseAuditAction,
  CaseAuditLog,
  CreateCaseRequest,
  UpdateCaseStatusRequest,
} from '../../../lib/types';

// Import the base CarrierPlatform to extend it
import type { CarrierPlatform as BaseCarrierPlatform } from '../../../lib/types';

// Extend CarrierPlatform with 'Test' for local development testing
export type CarrierPlatform = BaseCarrierPlatform | 'Test';

// ============================================
// Extension-specific types
// ============================================

export type AutofillState = 'idle' | 'running' | 'paused' | 'error' | 'completed';

export interface ExtensionState {
  currentCaseId: string | null;
  currentCase: import('../../../lib/types').CaseWithCarriers | null;
  autofillState: AutofillState;
  currentHost: string | null;
  detectedCarrier: CarrierPlatform | null;
  lastError: string | null;
  currentPageIdentifier: string | null;
}

// Messages between popup <-> content script <-> background
export type MessageType =
  | 'START_AUTOFILL'
  | 'PAUSE_AUTOFILL'
  | 'RESUME_AUTOFILL'
  | 'GET_STATE'
  | 'STATE_UPDATE'
  | 'MFA_DETECTED'
  | 'PAGE_COMPLETED'
  | 'AUTOFILL_ERROR'
  | 'AUTOFILL_COMPLETE'
  | 'API_REQUEST';

export interface ExtensionMessage {
  type: MessageType;
  payload?: unknown;
}

export interface StartAutofillPayload {
  caseData: import('../../../lib/types').CaseWithCarriers;
}

export interface StateUpdatePayload {
  state: Partial<ExtensionState>;
}

export interface ErrorPayload {
  message: string;
  pageIdentifier?: string;
}

// ============================================
// Carrier Mapping Types
// ============================================
// TODO: Eventually move mapping definitions to database for in-app editing

export interface FieldMapping {
  caseField: string; // e.g., 'client.firstName'
  selectors: string[]; // CSS selectors to try in order
  inputType?: 'text' | 'select' | 'radio' | 'checkbox' | 'date';
  transform?: 'uppercase' | 'lowercase' | 'phone' | 'date_mmddyyyy' | 'date_yyyymmdd';
}

export interface PageMapping {
  id: string;
  urlPattern: string | RegExp;
  domMarkers?: string[]; // Optional DOM elements to verify we're on the right page
  fields: FieldMapping[];
  nextButtonSelector?: string;
  mfaIndicators?: string[]; // Selectors that indicate MFA is required
}

export interface CarrierMapping {
  platform: CarrierPlatform;
  hostPattern: string;
  pages: PageMapping[];
}
