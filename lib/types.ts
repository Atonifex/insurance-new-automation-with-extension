// ============================================
// Shared TypeScript Types for Insurance Autofill
// ============================================

export type CarrierPlatform = 'iPipeline' | 'Americo' | 'Transamerica';

export type CaseCarrierStatus =
  | 'not_started'
  | 'in_progress'
  | 'waiting_mfa'
  | 'error'
  | 'completed';

export type SmokerStatus = 'smoker' | 'non-smoker';

// ============================================
// Core Domain Models
// ============================================

export interface Agent {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  agentId: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  dateOfBirth: string; // ISO date string YYYY-MM-DD
  ssnLast4?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  email?: string;
  smokerStatus: SmokerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: string;
  agentId: string;
  clientId: string;
  client?: Client; // Populated on fetch
  coverageAmount: number;
  termLengthYears: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseCarrier {
  id: string;
  caseId: string;
  carrierPlatform: CarrierPlatform;
  carrierName: string; // e.g. 'Transamerica', 'Americo'
  status: CaseCarrierStatus;
  lastStatusMessage?: string;
  lastPageIdentifier?: string;
  updatedAt: string;
}

export interface CaseAuditLog {
  id: string;
  caseId: string;
  agentId: string;
  carrierPlatform?: CarrierPlatform;
  pageIdentifier?: string;
  action: CaseAuditAction;
  message?: string;
  createdAt: string;
}

export type CaseAuditAction =
  | 'CASE_CREATED'
  | 'AUTOFILL_STARTED'
  | 'PAGE_COMPLETED'
  | 'MFA_DETECTED'
  | 'MFA_COMPLETED'
  | 'ERROR_OCCURRED'
  | 'AUTOFILL_COMPLETED'
  | 'AUTOFILL_PAUSED'
  | 'AUTOFILL_RESUMED';

// ============================================
// API Request/Response Types
// ============================================

export interface CreateCaseRequest {
  client: Omit<Client, 'id' | 'agentId' | 'createdAt' | 'updatedAt'>;
  coverageAmount: number;
  termLengthYears: number;
  selectedCarriers: CarrierPlatform[];
}

export interface UpdateCaseStatusRequest {
  caseId: string;
  carrierPlatform: CarrierPlatform;
  status: CaseCarrierStatus;
  pageIdentifier?: string;
  message?: string;
}

export interface CaseWithCarriers extends Case {
  client: Client;
  carriers: CaseCarrier[];
}

// ============================================
// Session / Auth Types
// ============================================

export interface SessionUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: SessionUser;
  error?: string;
}

