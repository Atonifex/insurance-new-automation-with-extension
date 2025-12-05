import { CaseCarrier } from '@/lib/types';
import { CARRIER_CONFIGS } from '@/lib/carriers';
import StatusBadge from './StatusBadge';

interface CarrierCardProps {
  carrier: CaseCarrier;
  onOpenPortal?: () => void;
}

export default function CarrierCard({ carrier, onOpenPortal }: CarrierCardProps) {
  const config = CARRIER_CONFIGS[carrier.carrierPlatform];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: config.logoColor }}
          >
            {carrier.carrierPlatform[0]}
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">
              {config.displayName}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              {carrier.carrierName}
            </p>
          </div>
        </div>
        <StatusBadge status={carrier.status} size="sm" />
      </div>

      {carrier.lastStatusMessage && (
        <p className="text-sm text-[var(--text-secondary)] mb-4 bg-[var(--border-light)] rounded-lg px-3 py-2">
          {carrier.lastStatusMessage}
        </p>
      )}

      {carrier.lastPageIdentifier && (
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Last page: <span className="font-mono">{carrier.lastPageIdentifier}</span>
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={onOpenPortal}
          className="flex-1 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-light)] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open Portal
        </button>
      </div>
    </div>
  );
}

