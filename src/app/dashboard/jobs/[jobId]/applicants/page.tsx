'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge';
import { useAdminApplications } from '@/hooks/useAdmin';
import {
  ArrowLeftIcon,
  UserIcon,
  SparklesIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

export default function JobApplicantsPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const { applications, isLoading, updateStatus } = useAdminApplications();

  // Filter applications for this job
  const jobApplications = applications.filter(
    app => String(app.job) === jobId || String((app.job as { id: number })?.id) === jobId
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/jobs">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Job Applicants
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {jobApplications.length} applicants for this position
        </p>
      </div>

      {/* Applicants List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : jobApplications.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No applicants yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              No one has applied to this job yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobApplications.map((application) => (
            <Card key={application.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {(application.applicant_name || 'U').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {application.applicant_name || 'Unknown'}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {application.applicant_email}
                      </p>
                    </div>
                  </div>

                  {/* Match Score */}
                  {application.match_score && (
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4 text-violet-500" />
                      <span className="font-semibold text-violet-600">
                        {application.match_score}% match
                      </span>
                    </div>
                  )}

                  {/* Status */}
                  <select
                    value={application.status}
                    onChange={(e) => updateStatus(application.id, e.target.value)}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interview">Interview</option>
                    <option value="offered">Offered</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Actions */}
                  <Button variant="outline" size="sm">
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>

                {/* Applied Date */}
                <p className="text-sm text-slate-500 mt-4">
                  Applied on {new Date(application.applied_date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
