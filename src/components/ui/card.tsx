import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, children, hover = false, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
        hover && 'hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10',
        'shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'px-6 py-5 border-b border-slate-100 dark:border-slate-700/50',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-slate-900 dark:text-white',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: CardProps) {
  return (
    <p className={cn('text-sm text-slate-500 dark:text-slate-400 mt-1', className)}>
      {children}
    </p>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn('px-6 py-5', className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 rounded-b-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}

// New: Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; isPositive?: boolean; label?: string };
  color?: 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';
}

const colorClasses = {
  violet: 'from-violet-500 to-purple-600 text-violet-600 dark:text-violet-400',
  emerald: 'from-emerald-500 to-teal-600 text-emerald-600 dark:text-emerald-400',
  amber: 'from-amber-500 to-orange-600 text-amber-600 dark:text-amber-400',
  rose: 'from-rose-500 to-pink-600 text-rose-600 dark:text-rose-400',
  cyan: 'from-cyan-500 to-blue-600 text-cyan-600 dark:text-cyan-400',
};

export function StatCard({ title, value, icon, trend, color = 'violet' }: StatCardProps) {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
        <div
          className={cn(
            'w-full h-full rounded-full opacity-10 bg-gradient-to-br',
            colorClasses[color].split(' ').slice(0, 2).join(' ')
          )}
        />
      </div>
      <CardContent className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
            {trend && (
              <div className="mt-2 flex items-center text-sm">
                <span className="font-medium text-emerald-600">
                  +{trend.value}
                </span>
                <span className="ml-2 text-slate-500">{trend.label || 'vs last month'}</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              'p-4 rounded-2xl bg-gradient-to-br',
              colorClasses[color].split(' ').slice(0, 2).join(' ')
            )}
          >
            <div className="text-white">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
