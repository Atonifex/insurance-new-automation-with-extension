import { NextRequest, NextResponse } from 'next/server';
import {
  validateCredentials,
  createSession,
  SESSION_COOKIE_NAME,
  getSessionCookieOptions,
} from '@/lib/auth';
import { LoginRequest, AuthResponse } from '@/lib/types';

//TODO: Add actual login logic with Supabase****************
//TODO: Add error handling for invalid credentials
//TODO: Add error handling for internal server errors
//TODO: Add error handling for network errors
//TODO: Add error handling for invalid requests
//TODO: Add error handling for unauthorized requests
//TODO: Add error handling for forbidden requests
//TODO: Add error handling for not found requests
//TODO: Add error handling for bad requests
//TODO: Add error handling for unauthorized requests

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      const response: AuthResponse = {
        success: false,
        error: 'Email and password are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = validateCredentials(email, password);

    if (!user) {
      const response: AuthResponse = {
        success: false,
        error: 'Invalid email or password',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Create session
    const sessionToken = createSession(user);

    // Set cookie
    const response: AuthResponse = {
      success: true,
      user,
    };

    const res = NextResponse.json(response);
    res.cookies.set(SESSION_COOKIE_NAME, sessionToken, getSessionCookieOptions());

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

