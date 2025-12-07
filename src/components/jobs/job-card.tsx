'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/lib/api';
import {
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BookmarkIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface JobCardProps {
  job: Job;
  onSave?: (jobId: number) => void;
  onUnsave?: (jobId: number) => void;
}

export function JobCard({ job, onSave, onUnsave }: JobCardProps) {
  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (job.is_saved && onUnsave) {
      onUnsave(job.id);
    } else if (onSave) {
      onSave(job.id);
    }
  };

  return (
    <Link href={`/jobs/${job.slug}`}>
      <Card hover className="h-full group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {job.is_featured && (
                  <Badge variant="gradient" size="sm">
                    <SparklesIcon className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge variant="secondary" size="sm">
                  {job.category_name || 'General'}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {job.company_name}
              </p>
            </div>
            {(onSave || onUnsave) && (
              <button
                onClick={handleSaveClick}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {job.is_saved ? (
                  <BookmarkSolidIcon className="h-5 w-5 text-violet-600" />
                ) : (
                  <BookmarkIcon className="h-5 w-5 text-slate-400" />
                )}
              </button>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
            {job.summary}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {job.location}
              {job.is_remote && ' (Remote)'}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {getDaysAgo(job.posted_date)}
            </span>
            {job.salary_range && job.show_salary && (
              <span className="flex items-center gap-1">
                <CurrencyDollarIcon className="h-4 w-4" />
                {job.salary_range}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" size="sm">
              {job.job_type.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" size="sm">
              {job.experience_level}
            </Badge>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {job.applications_count} applicants
            </span>
            <Button size="sm" variant="ghost">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
