'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardStats, useApplicationsByStatus, useHiringFunnel, useTopJobs, useApplicationsByJob, useCategoryStats } from '@/hooks/useAnalytics';
import {
  ChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const { stats, isLoading: statsLoading } = useDashboardStats();
  const { data: statusData, isLoading: statusLoading } = useApplicationsByStatus();
  const { data: funnelData, isLoading: funnelLoading } = useHiringFunnel();
  const { data: topJobs, isLoading: jobsLoading } = useTopJobs();
  const { data: categoryStats, isLoading: categoryLoading } = useCategoryStats();

  const metrics = [
    { title: 'Total Applications', value: stats?.total_applications || 0, icon: UserGroupIcon, color: 'violet' },
    { title: 'Active Jobs', value: stats?.active_jobs || 0, icon: BriefcaseIcon, color: 'cyan' },
    { title: 'Pending Review', value: stats?.pending_applications || 0, icon: ClockIcon, color: 'amber' },
    { title: 'Total Hires', value: stats?.total_hires || 0, icon: CheckCircleIcon, color: 'emerald' },
  ];

  const colorClasses: Record<string, string> = {
    violet: 'bg-violet-500',
    cyan: 'bg-cyan-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics & Insights</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Track your hiring performance and get actionable insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))
        ) : (
          metrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <div className={cn('w-full h-full rounded-full opacity-10', colorClasses[metric.color])} />
              </div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{metric.value}</p>
                  </div>
                  <div className={cn('p-3 rounded-2xl', colorClasses[metric.color])}>
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Applications by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-violet-500" />
              Applications by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {statusLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ))}
              </div>
            ) : statusData.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No data available</p>
            ) : (
              <div className="space-y-4">
                {statusData.map((item, index) => {
                  const maxCount = Math.max(...statusData.map(d => d.count));
                  const width = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
                        {item.status}
                      </div>
                      <div className="flex-1">
                        <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-end pr-3"
                            style={{ width: `${width}%` }}
                          >
                            {width > 20 && (
                              <span className="text-white text-sm font-medium">{item.count}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {width <= 20 && (
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.count}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hiring Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {funnelLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ))}
              </div>
            ) : funnelData.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No data available</p>
            ) : (
              <div className="space-y-4">
                {funnelData.map((item, index) => {
                  const colors = ['bg-slate-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500', 'bg-green-600'];
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.stage}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 dark:text-slate-400">{item.percentage}%</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{item.count}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-500', colors[index % colors.length])}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Jobs</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {jobsLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : topJobs.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No data available</p>
          ) : (
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">{job.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {job.applications_count} applications • {job.views_count} views
                    </p>
                  </div>
                  <Badge variant="success">
                    {job.applications_count > 0 && job.views_count > 0
                      ? `${((job.applications_count / job.views_count) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Applications by Category</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {categoryLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : categoryStats.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No data available</p>
          ) : (
            <div className="space-y-4">
              {categoryStats.map((cat, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">{cat.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {cat.jobs_count} jobs
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">{cat.applications_count}</p>
                    <p className="text-xs text-slate-500">applications</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
