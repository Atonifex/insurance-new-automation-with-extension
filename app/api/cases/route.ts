import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, SESSION_COOKIE_NAME } from '@/lib/auth';
import { getCasesByAgent, createCase } from '@/lib/db';
import { CreateCaseRequest } from '@/lib/types';

// GET /api/cases - List all cases for the current agent
export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const user = getSessionUser(sessionToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cases = getCasesByAgent(user.id);
    return NextResponse.json({ cases });
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/cases - Create a new case
export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const user = getSessionUser(sessionToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: CreateCaseRequest = await request.json();
    const { client, coverageAmount, termLengthYears, selectedCarriers } = body;

    // Basic validation
    if (!client || !coverageAmount || !termLengthYears || !selectedCarriers?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newCase = createCase(
      user.id,
      client,
      coverageAmount,
      termLengthYears,
      selectedCarriers
    );

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

