import { ReactNode } from 'react';
import { Card, CardContent } from '../common/Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  className,
}: StatCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {change && (
              <div className="mt-2 flex items-center text-sm">
                <span
                  className={cn(
                    'font-medium',
                    change.isPositive
                      ? 'text-green-600 dark:text-green-500'
                      : 'text-red-600 dark:text-red-500'
                  )}
                >
                  {change.isPositive ? '+' : ''}
                  {change.value}%
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">
                  from last month
                </span>
              </div>
            )}
          </div>
          <div className="rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-gray-700 dark:text-primary-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}