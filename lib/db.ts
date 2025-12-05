// ============================================
// Database Layer
// ============================================
// For v1: In-memory mock data store
// TODO: Replace with Supabase/Postgres

import {
  Case,
  CaseCarrier,
  CaseWithCarriers,
  Client,
  CarrierPlatform,
  CaseCarrierStatus,
  CaseAuditLog,
  CaseAuditAction,
} from './types';

// ============================================
// Mock Data Store
// ============================================

const clients: Map<string, Client> = new Map();
const cases: Map<string, Case> = new Map();
const caseCarriers: Map<string, CaseCarrier> = new Map();
const auditLogs: CaseAuditLog[] = [];

// ============================================
// Initialize with Demo Data
// ============================================

function initializeDemoData() {
  // Demo client
  const demoClient: Client = {
    id: 'client-1',
    agentId: 'agent-1',
    firstName: 'John',
    middleInitial: 'M',
    lastName: 'Smith',
    dateOfBirth: '1985-03-15',
    ssnLast4: '1234',
    address: '123 Main Street',
    city: 'Columbia',
    state: 'SC',
    zipCode: '29201',
    phone: '803-555-0123',
    email: 'john.smith@email.com',
    smokerStatus: 'non-smoker',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  clients.set(demoClient.id, demoClient);

  // Demo case
  const demoCase: Case = {
    id: 'demo-case-1',
    agentId: 'agent-1',
    clientId: 'client-1',
    coverageAmount: 250000,
    termLengthYears: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  cases.set(demoCase.id, demoCase);

  // Demo case carriers
  const iPipelineCarrier: CaseCarrier = {
    id: 'cc-1',
    caseId: 'demo-case-1',
    carrierPlatform: 'iPipeline',
    carrierName: 'Transamerica',
    status: 'not_started',
    updatedAt: new Date().toISOString(),
  };
  caseCarriers.set(iPipelineCarrier.id, iPipelineCarrier);

  const americoCarrier: CaseCarrier = {
    id: 'cc-2',
    caseId: 'demo-case-1',
    carrierPlatform: 'Americo',
    carrierName: 'Americo',
    status: 'not_started',
    updatedAt: new Date().toISOString(),
  };
  caseCarriers.set(americoCarrier.id, americoCarrier);

  const transamericaCarrier: CaseCarrier = {
    id: 'cc-3',
    caseId: 'demo-case-1',
    carrierPlatform: 'Transamerica',
    carrierName: 'Transamerica',
    status: 'not_started',
    updatedAt: new Date().toISOString(),
  };
  caseCarriers.set(transamericaCarrier.id, transamericaCarrier);
}

// Initialize on module load
initializeDemoData();

// ============================================
// Client Operations
// ============================================

export function getClient(clientId: string): Client | null {
  return clients.get(clientId) || null;
}

export function getClientsByAgent(agentId: string): Client[] {
  return Array.from(clients.values()).filter((c) => c.agentId === agentId);
}

export function createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
  const newClient: Client = {
    ...client,
    id: `client-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  clients.set(newClient.id, newClient);
  return newClient;
}

// ============================================
// Case Operations
// ============================================

export function getCase(caseId: string): Case | null {
  return cases.get(caseId) || null;
}

export function getCaseWithCarriers(caseId: string): CaseWithCarriers | null {
  const caseData = cases.get(caseId);
  if (!caseData) return null;

  const client = clients.get(caseData.clientId);
  if (!client) return null;

  const carriers = Array.from(caseCarriers.values()).filter(
    (cc) => cc.caseId === caseId
  );

  return {
    ...caseData,
    client,
    carriers,
  };
}

export function getCasesByAgent(agentId: string): CaseWithCarriers[] {
  const agentCases = Array.from(cases.values()).filter(
    (c) => c.agentId === agentId
  );

  return agentCases.map((caseData) => {
    const client = clients.get(caseData.clientId)!;
    const carriers = Array.from(caseCarriers.values()).filter(
      (cc) => cc.caseId === caseData.id
    );
    return { ...caseData, client, carriers };
  });
}

export function createCase(
  agentId: string,
  clientData: Omit<Client, 'id' | 'agentId' | 'createdAt' | 'updatedAt'>,
  coverageAmount: number,
  termLengthYears: number,
  selectedCarriers: CarrierPlatform[]
): CaseWithCarriers {
  // Create client first
  const client = createClient({ ...clientData, agentId });

  // Create case
  const newCase: Case = {
    id: `case-${Date.now()}`,
    agentId,
    clientId: client.id,
    coverageAmount,
    termLengthYears,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  cases.set(newCase.id, newCase);

  // Create case carriers
  const carriers: CaseCarrier[] = selectedCarriers.map((platform, index) => {
    const carrier: CaseCarrier = {
      id: `cc-${Date.now()}-${index}`,
      caseId: newCase.id,
      carrierPlatform: platform,
      carrierName: platform, // Can be more specific later
      status: 'not_started',
      updatedAt: new Date().toISOString(),
    };
    caseCarriers.set(carrier.id, carrier);
    return carrier;
  });

  // Log audit
  addAuditLog(newCase.id, agentId, 'CASE_CREATED', undefined, undefined, 'Case created');

  return { ...newCase, client, carriers };
}

// ============================================
// Case Carrier Status Operations
// ============================================

export function updateCaseCarrierStatus(
  caseId: string,
  carrierPlatform: CarrierPlatform,
  status: CaseCarrierStatus,
  pageIdentifier?: string,
  message?: string
): CaseCarrier | null {
  const carrier = Array.from(caseCarriers.values()).find(
    (cc) => cc.caseId === caseId && cc.carrierPlatform === carrierPlatform
  );

  if (!carrier) return null;

  carrier.status = status;
  carrier.lastPageIdentifier = pageIdentifier || carrier.lastPageIdentifier;
  carrier.lastStatusMessage = message || carrier.lastStatusMessage;
  carrier.updatedAt = new Date().toISOString();

  return carrier;
}

export function getCaseCarriers(caseId: string): CaseCarrier[] {
  return Array.from(caseCarriers.values()).filter((cc) => cc.caseId === caseId);
}

// ============================================
// Audit Log Operations
// ============================================

export function addAuditLog(
  caseId: string,
  agentId: string,
  action: CaseAuditAction,
  carrierPlatform?: CarrierPlatform,
  pageIdentifier?: string,
  message?: string
): CaseAuditLog {
  const log: CaseAuditLog = {
    id: `log-${Date.now()}`,
    caseId,
    agentId,
    action,
    carrierPlatform,
    pageIdentifier,
    message,
    createdAt: new Date().toISOString(),
  };
  auditLogs.push(log);
  return log;
}

export function getAuditLogs(caseId: string): CaseAuditLog[] {
  return auditLogs.filter((log) => log.caseId === caseId);
}

