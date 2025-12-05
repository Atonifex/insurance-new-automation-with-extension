// ============================================
// API Client for Extension
// Communicates with the web-app backend
// ============================================

import { CaseWithCarriers, CarrierPlatform, CaseCarrierStatus } from '../types/models';

// Default to localhost for development
// In production, this would be your Vercel deployment URL
// TODO after 12/5/2025: Change this to the actual production URL *****************
const API_BASE_URL = 'http://localhost:3000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include', // Include cookies for auth
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || `HTTP ${response.status}` };
    }

    return { data };
  } catch (error) {
    console.error('[API] Request failed:', error);
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

// ============================================
// API Functions
// ============================================

/**
 * Fetch a specific case with client and carrier details
 */
export async function fetchCase(caseId: string): Promise<ApiResponse<CaseWithCarriers>> {
  return apiRequest<CaseWithCarriers>(`/api/cases/${caseId}`);
}

/**
 * Fetch all cases for the current agent
 */
export async function fetchCases(): Promise<ApiResponse<{ cases: CaseWithCarriers[] }>> {
  return apiRequest<{ cases: CaseWithCarriers[] }>('/api/cases');
}

/**
 * Update carrier status for a case (called during autofill)
 */
export async function updateStatus(
  caseId: string,
  carrierPlatform: CarrierPlatform,
  status: CaseCarrierStatus,
  pageIdentifier?: string,
  message?: string
): Promise<ApiResponse<{ success: boolean }>> {
  return apiRequest<{ success: boolean }>('/api/app-status', {
    method: 'POST',
    body: JSON.stringify({
      caseId,
      carrierPlatform,
      status,
      pageIdentifier,
      message,
    }),
  });
}

/**
 * Check if the user is authenticated
 */
export async function checkAuth(): Promise<ApiResponse<{ user: { id: string; email: string } | null }>> {
  return apiRequest<{ user: { id: string; email: string } | null }>('/api/auth/me');
}

