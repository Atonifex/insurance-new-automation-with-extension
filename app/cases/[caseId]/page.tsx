'use client';

//Should the <p> be inputs instead? If so, how do we handle the validation?

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import StatusBadge from '@/components/StatusBadge';
import CarrierCard from '@/components/CarrierCard';
import { CaseWithCarriers, SessionUser } from '@/lib/types';
import { CARRIER_CONFIGS } from '@/lib/carriers';

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.caseId as string;

  const [user, setUser] = useState<SessionUser | null>(null);
  const [caseData, setCaseData] = useState<CaseWithCarriers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthAndFetchCase();
  }, [caseId]);

  const checkAuthAndFetchCase = async () => {
    try {
      // Check auth
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();

      if (!authData.user) {
        router.push('/login');
        return;
      }
      setUser(authData.user);

      // Fetch case
      const caseRes = await fetch(`/api/cases/${caseId}`);
      const caseJson = await caseRes.json();

      if (caseJson.error) {
        setError(caseJson.error);
      } else {
        setCaseData(caseJson);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load case');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const openCarrierPortal = (portalUrl: string) => {
    window.open(portalUrl, '_blank');
  };

  const openAllPortals = () => {
    if (!caseData) return;
    caseData.carriers.forEach((carrier) => {
      const config = CARRIER_CONFIGS[carrier.carrierPlatform];
      window.open(config.portalUrl, '_blank');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header userEmail={user?.email} onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 text-center">
            <div className="text-[var(--error)] text-6xl mb-4">⚠</div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              {error || 'Case not found'}
            </h2>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline mt-4"
            >
              ← Back to Cases
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const { client, carriers } = caseData;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 animate-fade-in">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cases
          </Link>
        </div>

        {/* Case Header */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  {client.firstName} {client.middleInitial ? `${client.middleInitial}. ` : ''}{client.lastName}
                </h1>
              </div>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Case ID: <span className="font-mono">{caseData.id}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--border-light)] rounded-xl p-4">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Coverage
                  </p>
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    ${caseData.coverageAmount.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[var(--border-light)] rounded-xl p-4">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Term
                  </p>
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    {caseData.termLengthYears} Years
                  </p>
                </div>
                <div className="bg-[var(--border-light)] rounded-xl p-4">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Date of Birth
                  </p>
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    {new Date(client.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-[var(--border-light)] rounded-xl p-4">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Smoker Status
                  </p>
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    {client.smokerStatus === 'smoker' ? '🚬 Smoker' : '✓ Non-Smoker'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <button
                onClick={openAllPortals}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Begin All Applications
              </button>
              <p className="text-xs text-[var(--text-muted)] text-center lg:text-right">
                Opens all carrier portals in new tabs
              </p>
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 mb-8 animate-fade-in stagger-1">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Client Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-muted)]">Full Name</p>
              <p className="text-[var(--text-primary)] font-medium">
                {client.firstName} {client.middleInitial ? `${client.middleInitial}. ` : ''}{client.lastName}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">Address</p>
              <p className="text-[var(--text-primary)] font-medium">
                {client.address}, {client.city}, {client.state} {client.zipCode}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">Phone</p>
              <p className="text-[var(--text-primary)] font-medium">{client.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">Email</p>
              <p className="text-[var(--text-primary)] font-medium">{client.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">SSN (Last 4)</p>
              <p className="text-[var(--text-primary)] font-medium font-mono">
                •••-••-{client.ssnLast4 || '••••'}
              </p>
            </div>
          </div>
        </div>

        {/* Carrier Status Cards */}
        <div className="mb-8 animate-fade-in stagger-2">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Carrier Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carriers.map((carrier) => (
              <CarrierCard
                key={carrier.id}
                carrier={carrier}
                onOpenPortal={() =>
                  openCarrierPortal(CARRIER_CONFIGS[carrier.carrierPlatform].portalUrl)
                }
              />
            ))}
          </div>
        </div>

        {/* Extension Instructions */}
        <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-2xl border border-[var(--border)] p-6 sm:p-8 animate-fade-in stagger-3">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Using the Chrome Extension
              </h3>
              <ol className="text-[var(--text-secondary)] space-y-2 text-sm list-decimal list-inside">
                <li>Open a carrier portal and log in with your credentials</li>
                <li>Start a new application and select the product/plan</li>
                <li>Click the PolyFill Agent extension icon</li>
                <li>Select this case (ID: <code className="bg-[var(--border-light)] px-1.5 py-0.5 rounded text-xs">{caseData.id}</code>) and click &quot;Start Autofill&quot;</li>
                <li>The extension will fill fields and navigate through pages automatically</li>
                <li>If MFA is required, complete it manually then click &quot;Resume&quot;</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

