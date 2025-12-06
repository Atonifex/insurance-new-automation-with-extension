// ============================================
// Authentication Helpers
// ============================================
// For v1: Simple hardcoded demo auth
// TODO: Replace with Supabase Auth in production

import { SessionUser } from './types';

// Demo user for development
const DEMO_USER: SessionUser = {
  id: 'agent-1',
  email: 'demo@agency.com',
  firstName: 'Demo',
  lastName: 'Agent',
};

const DEMO_PASSWORD = 'mydadis6foot7lolz';

// In-memory session store (will reset on server restart)
// TODO: Replace with proper session management (Supabase, JWT, etc.)
const sessions: Map<string, SessionUser> = new Map();

export function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function validateCredentials(email: string, password: string): SessionUser | null {
  // For demo purposes - single hardcoded user
  if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
    return DEMO_USER;
  }
  return null;
}

export function createSession(user: SessionUser): string {
  const token = generateSessionToken();
  sessions.set(token, user);
  return token;
}

export function getSessionUser(token: string | undefined): SessionUser | null {
  if (!token) return null;
  return sessions.get(token) || null;
}

export function destroySession(token: string): void {
  sessions.delete(token);
}

// Cookie helpers
export const SESSION_COOKIE_NAME = 'polyfill_session';

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    // Allow cross-site requests from the extension (chrome-extension:// and https://transamerica.com)
    // In production you should serve over HTTPS; for localhost dev we still set secure:false.
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  };
}

