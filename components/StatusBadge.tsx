import { CaseCarrierStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: CaseCarrierStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const statusConfig: Record<
  CaseCarrierStatus,
  { label: string; color: string; bgColor: string; icon: string }
> = {
  not_started: {
    label: 'Not Started',
    color: 'text-[var(--text-muted)]',
    bgColor: 'bg-[var(--border-light)]',
    icon: '○',
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-[var(--info)]',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    icon: '◐',
  },
  waiting_mfa: {
    label: 'Waiting MFA',
    color: 'text-[var(--warning)]',
    bgColor: 'bg-amber-50 dark:bg-amber-950',
    icon: '⏸',
  },
  error: {
    label: 'Error',
    color: 'text-[var(--error)]',
    bgColor: 'bg-red-50 dark:bg-red-950',
    icon: '✕',
  },
  completed: {
    label: 'Completed',
    color: 'text-[var(--success)]',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950',
    icon: '✓',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

export default function StatusBadge({
  status,
  size = 'md',
  showIcon = true,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bgColor} ${config.color} ${sizeClasses[size]}`}
    >
      {showIcon && (
        <span
          className={
            status === 'in_progress' ? 'animate-pulse-subtle' : undefined
          }
        >
          {config.icon}
        </span>
      )}
      {config.label}
    </span>
  );
}

