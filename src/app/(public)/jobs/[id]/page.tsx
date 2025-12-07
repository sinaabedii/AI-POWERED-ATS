'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJob, useSavedJobs } from '@/hooks/useJobs';
import { useMyApplications } from '@/hooks/useApplications';
import { useAuthStore } from '@/store/auth-store';
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShareIcon,
  BookmarkIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyMessage, setApplyMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { job, isLoading, error } = useJob(slug);
  const { isAuthenticated } = useAuthStore();
  const { applyToJob } = useMyApplications();

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  const handleApply = async () => {
    if (!job || applyLoading) return;
    setApplyLoading(true);
    setApplyMessage(null);
    
    const result = await applyToJob({ job: job.id });
    
    if (result.success) {
      setApplyMessage({ type: 'success', text: 'Application submitted successfully!' });
    } else {
      setApplyMessage({ type: 'error', text: result.error || 'Failed to submit application' });
    }
    setApplyLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32">
        <div className="container-custom">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Job Not Found</h1>
          <p className="text-slate-500 mb-8">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-950" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Jobs
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="gradient">
                  <SparklesIcon className="h-3 w-3 mr-1" />
                  {job.category_name || 'General'}
                </Badge>
                {job.is_active ? (
                  <Badge variant="success" dot>
                    Actively Hiring
                  </Badge>
                ) : (
                  <Badge variant="secondary">Closed</Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-400">
                <span className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5" />
                  {job.job_type.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Posted {getDaysAgo(job.posted_date)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              {isAuthenticated ? (
                <Button size="lg" onClick={handleApply} disabled={job.has_applied}>
                  {job.has_applied ? 'Already Applied' : 'Apply Now'}
                </Button>
              ) : (
                <Link href="/login">
                  <Button size="lg">Sign in to Apply</Button>
                </Link>
              )}
              <div className="flex gap-3">
                <Button variant="glass" size="icon" className="flex-1 sm:flex-none">
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
                <Button variant="glass" size="icon" className="flex-1 sm:flex-none">
                  <ShareIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-violet-500" />
                    About This Role
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {job.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Job Description
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                      What You&apos;ll Do
                    </h2>
                    <ul className="space-y-4">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                      What We&apos;re Looking For
                    </h2>
                    <ul className="space-y-4">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-28 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-600" />
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Interested in this role?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Apply now and our AI will match your profile with this position.
                  </p>
                  {applyMessage && (
                    <div className={`mb-4 p-3 rounded-xl text-sm ${
                      applyMessage.type === 'success' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {applyMessage.text}
                    </div>
                  )}
                  {isAuthenticated ? (
                    <Button 
                      className="w-full" 
                      onClick={handleApply} 
                      disabled={job.has_applied || applyLoading}
                      isLoading={applyLoading}
                    >
                      {job.has_applied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full">Sign in to Apply</Button>
                    </Link>
                  )}

                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Category</span>
                      <Badge variant="secondary">{job.category_name || 'General'}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Location</span>
                      <span className="font-medium text-slate-900 dark:text-white">{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Type</span>
                      <span className="font-medium text-slate-900 dark:text-white">{job.job_type.replace('_', ' ')}</span>
                    </div>
                    {job.salary_range && job.show_salary && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Salary</span>
                        <span className="font-medium text-slate-900 dark:text-white">{job.salary_range}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Applicants</span>
                      <span className="font-medium text-slate-900 dark:text-white">{job.applications_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Card */}
              {job.about_company && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                      About {job.company_name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {job.about_company}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
