import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 ring-1 ring-violet-500/20',
        secondary:
          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-slate-500/20',
        success:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 ring-1 ring-emerald-500/20',
        warning:
          'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 ring-1 ring-amber-500/20',
        danger:
          'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 ring-1 ring-rose-500/20',
        info:
          'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 ring-1 ring-cyan-500/20',
        gradient:
          'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30',
        outline:
          'bg-transparent border-2 border-violet-500/50 text-violet-600 dark:text-violet-400',
      },
      size: {
        default: 'px-3 py-1 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({ className, variant, size, dot, pulse, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="relative mr-1.5">
          <span
            className={cn(
              'h-2 w-2 rounded-full inline-block',
              variant === 'success' && 'bg-emerald-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'danger' && 'bg-rose-500',
              variant === 'info' && 'bg-cyan-500',
              (!variant || variant === 'default') && 'bg-violet-500'
            )}
          />
          {pulse && (
            <span
              className={cn(
                'absolute inset-0 h-2 w-2 rounded-full animate-ping opacity-75',
                variant === 'success' && 'bg-emerald-500',
                variant === 'warning' && 'bg-amber-500',
                variant === 'danger' && 'bg-rose-500',
                variant === 'info' && 'bg-cyan-500',
                (!variant || variant === 'default') && 'bg-violet-500'
              )}
            />
          )}
        </span>
      )}
      {children}
    </span>
  );
}

// Status Badge for Applications
export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string; dot?: boolean }> = {
    pending: { variant: 'secondary', label: 'Pending', dot: true },
    reviewed: { variant: 'info', label: 'Reviewed', dot: true },
    shortlisted: { variant: 'default', label: 'Shortlisted', dot: true },
    interview: { variant: 'warning', label: 'Interview', dot: true },
    offered: { variant: 'success', label: 'Offered', dot: true },
    hired: { variant: 'gradient', label: 'Hired' },
    rejected: { variant: 'danger', label: 'Rejected', dot: true },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={config.variant} dot={config.dot} pulse={status === 'interview'}>
      {config.label}
    </Badge>
  );
}
