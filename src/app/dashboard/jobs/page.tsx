'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useJobsManage } from '@/hooks/useJobs';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export default function JobsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const { jobs, isLoading, deleteJob, toggleActive, toggleFeatured } = useJobsManage();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.category_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && job.is_active) ||
                         (statusFilter === 'inactive' && !job.is_active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Jobs Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, and manage your job postings
          </p>
        </div>
        <Button leftIcon={<PlusIcon className="h-5 w-5" />}>
          Create New Job
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {searchTerm ? 'No jobs found' : 'No jobs created yet'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Get started by creating your first job posting'
              }
            </p>
            {!searchTerm && (
              <Button leftIcon={<PlusIcon className="h-5 w-5" />}>
                Create Your First Job
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} hover className="group">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" size="sm">
                        {job.category_name || 'General'}
                      </Badge>
                      {job.is_active ? (
                        <Badge variant="success" size="sm" dot>
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="danger" size="sm">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteJob(job.id)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Posted {new Date(job.posted_date).toLocaleDateString()}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                  {job.summary}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <UserGroupIcon className="h-4 w-4" />
                      {job.applications_count} applicants
                    </span>
                    <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400">
                      <SparklesIcon className="h-4 w-4" />
                      AI Match
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/jobs/${job.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Button size="sm" className="flex-1">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    Applicants
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
