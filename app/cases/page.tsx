'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import StatusBadge from '@/components/StatusBadge';
import { CaseWithCarriers, SessionUser } from '@/lib/types';

export default function CasesListPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [cases, setCases] = useState<CaseWithCarriers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchCases();
  }, []);

  const checkAuthAndFetchCases = async () => {
    try {
      // Check auth
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();
      
      if (!authData.user) {
        router.push('/login');
        return;
      }
      setUser(authData.user);

      // Fetch cases
      const casesRes = await fetch('/api/cases');
      const casesData = await casesRes.json();
      setCases(casesData.cases || []);
    } catch (error) {
      console.error('Error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header userEmail={user?.email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Cases
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Manage your insurance application cases
            </p>
          </div>
          <Link
            href="/cases/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Case
          </Link>
        </div>

        {/* Cases Grid */}
        {cases.length === 0 ? (
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 text-center animate-fade-in">
            <div className="w-16 h-16 bg-[var(--border-light)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              No cases yet
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Create your first case to start autofilling insurance applications.
            </p>
            <Link
              href="/cases/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-light)] transition-colors"
            >
              Create Your First Case
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {cases.map((caseItem, index) => (
              <Link
                key={caseItem.id}
                href={`/cases/${caseItem.id}`}
                className={`bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6 hover:shadow-lg hover:border-[var(--accent)]/30 transition-all animate-fade-in stagger-${Math.min(index + 1, 5)}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {caseItem.client.firstName} {caseItem.client.lastName}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      ${caseItem.coverageAmount.toLocaleString()} · {caseItem.termLengthYears} year term
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      Case ID: {caseItem.id}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {caseItem.carriers.map((carrier) => (
                      <div
                        key={carrier.id}
                        className="flex items-center gap-2 bg-[var(--border-light)] rounded-lg px-3 py-1.5"
                      >
                        <span className="text-sm font-medium text-[var(--text-secondary)]">
                          {carrier.carrierPlatform}
                        </span>
                        <StatusBadge status={carrier.status} size="sm" showIcon={false} />
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

