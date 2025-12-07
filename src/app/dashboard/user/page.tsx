'use client';

import Link from 'next/link';
import { Card, CardContent, StatCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth-store';
import { useMyApplications } from '@/hooks/useApplications';
import {
  DocumentTextIcon,
  EyeIcon,
  SparklesIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const quickActions = [
  {
    title: 'Browse Jobs',
    description: 'Find your next opportunity',
    icon: RocketLaunchIcon,
    href: '/jobs',
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'AI Resume Review',
    description: 'Get AI feedback on your resume',
    icon: SparklesIcon,
    href: '#',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Skill Assessment',
    description: 'Take skill tests to boost your profile',
    icon: TrophyIcon,
    href: '#',
    color: 'from-emerald-500 to-teal-600',
  },
];

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const { applications, isLoading, stats } = useMyApplications();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 p-8">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {user?.first_name || 'User'}! 👋
          </h1>
          <p className="text-violet-100 max-w-2xl">
            Track your applications, discover new opportunities, and take the next step in your career journey.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Applications"
          value={stats.total}
          icon={<DocumentTextIcon className="h-6 w-6" />}
          color="violet"
        />
        <StatCard
          title="Under Review"
          value={stats.pending}
          icon={<ClockIcon className="h-6 w-6" />}
          color="amber"
        />
        <StatCard
          title="Interviews"
          value={stats.interviews}
          icon={<EyeIcon className="h-6 w-6" />}
          color="cyan"
        />
        <StatCard
          title="Offers"
          value={stats.offers}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          color="emerald"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<XCircleIcon className="h-6 w-6" />}
          color="rose"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Applications
            </h2>
            <Link href="/jobs">
              <Button size="sm">Browse More Jobs</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : applications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No applications yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Start your job search and apply to positions that match your skills.
                </p>
                <Link href="/jobs">
                  <Button>Browse Jobs</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <Card key={application.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {application.job_title || `Job #${application.job}`}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          {application.job_company} • Applied on {new Date(application.applied_date).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={application.status} />
                          {application.match_score && (
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <SparklesIcon className="h-4 w-4" />
                              {application.match_score}% match
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {action.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 border-0">
            <CardContent className="p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <TrophyIcon className="h-6 w-6" />
                </div>
                <h3 className="font-bold">Profile Strength</h3>
              </div>
              {(() => {
                // Calculate profile completion dynamically
                let score = 0;
                if (user?.first_name) score += 15;
                if (user?.last_name) score += 15;
                if (user?.email) score += 15;
                if (user?.title) score += 15;
                if (user?.bio) score += 20;
                if (user?.location) score += 10;
                if (user?.linkedin_url) score += 10;
                const strength = score >= 80 ? 'Very Strong' : score >= 60 ? 'Strong' : score >= 40 ? 'Good' : 'Needs Work';
                return (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>{score}% Complete</span>
                      <span>{strength}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                );
              })()}
              <p className="text-sm text-emerald-100 mb-4">
                Add skills and experience to boost your profile visibility.
              </p>
              <Button variant="glass" size="sm" className="w-full">
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
