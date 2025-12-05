import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, SESSION_COOKIE_NAME } from '@/lib/auth';
import { updateCaseCarrierStatus, addAuditLog, getCase } from '@/lib/db';
import { UpdateCaseStatusRequest, CaseAuditAction } from '@/lib/types';

// POST /api/app-status - Update carrier status from extension
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

    const body: UpdateCaseStatusRequest = await request.json();
    const { caseId, carrierPlatform, status, pageIdentifier, message } = body;

    // Validate request
    if (!caseId || !carrierPlatform || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: caseId, carrierPlatform, status' },
        { status: 400 }
      );
    }

    // Check case exists and belongs to agent
    const caseData = getCase(caseId);
    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }

    if (caseData.agentId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update carrier status
    const updated = updateCaseCarrierStatus(
      caseId,
      carrierPlatform,
      status,
      pageIdentifier,
      message
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Carrier not found for this case' },
        { status: 404 }
      );
    }

    // Determine audit action based on status
    let action: CaseAuditAction = 'AUTOFILL_STARTED';
    switch (status) {
      case 'in_progress':
        action = pageIdentifier ? 'PAGE_COMPLETED' : 'AUTOFILL_STARTED';
        break;
      case 'waiting_mfa':
        action = 'MFA_DETECTED';
        break;
      case 'error':
        action = 'ERROR_OCCURRED';
        break;
      case 'completed':
        action = 'AUTOFILL_COMPLETED';
        break;
    }

    // Log audit entry
    addAuditLog(
      caseId,
      user.id,
      action,
      carrierPlatform,
      pageIdentifier,
      message
    );

    return NextResponse.json({
      success: true,
      carrier: updated,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

