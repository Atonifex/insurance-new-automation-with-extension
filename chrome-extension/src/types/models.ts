// ============================================
// Shared Types for Chrome Extension
// These mirror the web-app types for consistency
// ============================================
//*********NOTE on 12/5/2025 @ 4:13 pm: SHOULDN'T THESE JUST BE IMPORTED FROM THE WEB-APP 
// LIB/TYPES.TS?
// DO THIS!!! ***************************************************

export type CarrierPlatform = 'iPipeline' | 'Americo' | 'Transamerica' | 'Test';

export type CaseCarrierStatus =
  | 'not_started'
  | 'in_progress'
  | 'waiting_mfa'
  | 'error'
  | 'completed';

export type SmokerStatus = 'smoker' | 'non-smoker';

export interface Client {
  id: string;
  agentId: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  dateOfBirth: string;
  ssnLast4?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  email?: string;
  smokerStatus: SmokerStatus;
}

export interface CaseCarrier {
  id: string;
  caseId: string;
  carrierPlatform: CarrierPlatform;
  carrierName: string;
  status: CaseCarrierStatus;
  lastStatusMessage?: string;
  lastPageIdentifier?: string;
}

export interface CaseWithCarriers {
  id: string;
  agentId: string;
  clientId: string;
  client: Client;
  coverageAmount: number;
  termLengthYears: number;
  carriers: CaseCarrier[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Extension-specific types
// ============================================

export type AutofillState = 'idle' | 'running' | 'paused' | 'error' | 'completed';

export interface ExtensionState {
  currentCaseId: string | null;
  currentCase: CaseWithCarriers | null;
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
  | 'AUTOFILL_COMPLETE';

export interface ExtensionMessage {
  type: MessageType;
  payload?: unknown;
}

export interface StartAutofillPayload {
  caseData: CaseWithCarriers;
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

