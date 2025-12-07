'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApplicationsManage } from '@/hooks/useApplications';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  SparklesIcon,
  UserIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | 'pending' | 'reviewed' | 'shortlisted' | 'interview' | 'offered' | 'hired' | 'rejected';

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview', label: 'Interview' },
  { value: 'offered', label: 'Offered' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' },
];

export default function ApplicantsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<'date' | 'match' | 'name'>('date');
  
  const { applications, isLoading, updateStatus } = useApplicationsManage();

  const filteredApplications = applications
    .filter(app => {
      const matchesSearch = (app.applicant_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (app.applicant_email || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return (b.match_score || 0) - (a.match_score || 0);
        case 'name':
          return (a.applicant_name || '').localeCompare(b.applicant_name || '');
        case 'date':
        default:
          return new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime();
      }
    });

  const getMatchScoreColor = (score?: number | null) => {
    if (!score) return 'text-slate-400';
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-violet-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Applicants Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Review and manage all job applicants in one place
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
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
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'match' | 'name')}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="date">Sort by Date</option>
              <option value="match">Sort by Match Score</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Showing {filteredApplications.length} of {applications.length} applicants
      </div>

      {/* Applicants List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredApplications.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No applicants found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No applications have been submitted yet'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} hover className="group">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {(application.applicant_name || 'U').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {application.applicant_name || 'Unknown'}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <EnvelopeIcon className="h-3.5 w-3.5" />
                          {application.applicant_email || 'No email'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job & Date */}
                  <div className="flex-1 lg:max-w-xs">
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {application.job_title || `Job #${application.job}`}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Applied {new Date(application.applied_date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center gap-2">
                    {application.match_score ? (
                      <div className="flex items-center gap-2">
                        <SparklesIcon className="h-4 w-4 text-violet-500" />
                        <span className={cn('font-semibold text-sm', getMatchScoreColor(application.match_score))}>
                          {application.match_score}%
                        </span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <select
                      value={application.status}
                      onChange={(e) => updateStatus(application.id, e.target.value)}
                      className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded text-sm"
                    >
                      {statusOptions.filter(o => o.value !== 'all').map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <DocumentTextIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
