'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApplicationsManage } from '@/hooks/useApplications';
import api, { Application } from '@/lib/api';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CalendarDaysIcon,
  DocumentArrowDownIcon,
  SparklesIcon,
  UserIcon,
  EnvelopeIcon,
  XMarkIcon,
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

const interviewTypes = [
  { value: 'phone', label: 'Phone Screen' },
  { value: 'video', label: 'Video Call' },
  { value: 'onsite', label: 'On-site' },
  { value: 'technical', label: 'Technical' },
  { value: 'final', label: 'Final Round' },
];

export default function ApplicantsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<'date' | 'match' | 'name'>('date');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    interview_type: 'video',
    scheduled_at: '',
    duration_minutes: 60,
    location: '',
    meeting_link: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  
  const { applications, isLoading, updateStatus, fetchApplications } = useApplicationsManage();

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

  // View application details
  const handleViewApplication = async (application: Application) => {
    try {
      const detail = await api.getApplicationDetail(application.id);
      setSelectedApplication(detail);
      setShowDetailModal(true);
    } catch {
      alert('Failed to load application details');
    }
  };

  // Open schedule interview modal
  const handleScheduleInterview = (application: Application) => {
    setSelectedApplication(application);
    setInterviewForm({
      interview_type: 'video',
      scheduled_at: '',
      duration_minutes: 60,
      location: '',
      meeting_link: '',
    });
    setShowInterviewModal(true);
  };

  // Submit interview scheduling
  const submitInterview = async () => {
    if (!selectedApplication || !interviewForm.scheduled_at) return;
    
    setIsSubmitting(true);
    try {
      await api.scheduleInterview(selectedApplication.id, {
        interview_type: interviewForm.interview_type,
        scheduled_at: new Date(interviewForm.scheduled_at).toISOString(),
        duration_minutes: interviewForm.duration_minutes,
        location: interviewForm.location,
        meeting_link: interviewForm.meeting_link,
      });
      setShowInterviewModal(false);
      fetchApplications();
      alert('Interview scheduled successfully!');
    } catch {
      alert('Failed to schedule interview');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download resume
  const handleDownloadResume = (application: Application) => {
    const detail = application as Application & { resume?: string | null };
    if (detail.resume) {
      window.open(detail.resume, '_blank');
    } else {
      alert('No resume available for this applicant');
    }
  };

  // Analyze application
  const handleAnalyze = async (application: Application) => {
    setAnalyzingId(application.id);
    try {
      const result = await api.analyzeApplication(application.id);
      fetchApplications();
      alert(`Analysis complete! Match score: ${result.match_score}%`);
    } catch {
      alert('Failed to analyze application');
    } finally {
      setAnalyzingId(null);
    }
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAnalyze(application)}
                        disabled={analyzingId === application.id}
                      >
                        <SparklesIcon className={cn('h-4 w-4 mr-1', analyzingId === application.id && 'animate-spin')} />
                        {analyzingId === application.id ? 'Analyzing...' : 'Analyze'}
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewApplication(application)}
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleScheduleInterview(application)}
                      title="Schedule Interview"
                    >
                      <CalendarDaysIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownloadResume(application)}
                      title="Download Resume"
                    >
                      <DocumentArrowDownIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Application Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Applicant</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedApplication.applicant_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedApplication.applicant_email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Job</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedApplication.job_title}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-medium text-slate-900 dark:text-white capitalize">{selectedApplication.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Applied Date</p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {new Date(selectedApplication.applied_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Match Score</p>
                  <p className={cn('font-medium', getMatchScoreColor(selectedApplication.match_score))}>
                    {selectedApplication.match_score ? `${selectedApplication.match_score}%` : 'Not analyzed'}
                  </p>
                </div>
              </div>
              {selectedApplication.cover_letter && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">Cover Letter</p>
                  <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    {selectedApplication.cover_letter}
                  </p>
                </div>
              )}
              {selectedApplication.portfolio_url && (
                <div>
                  <p className="text-sm text-slate-500">Portfolio</p>
                  <a href={selectedApplication.portfolio_url} target="_blank" rel="noopener noreferrer" 
                     className="text-violet-600 hover:underline">{selectedApplication.portfolio_url}</a>
                </div>
              )}
              {selectedApplication.linkedin_url && (
                <div>
                  <p className="text-sm text-slate-500">LinkedIn</p>
                  <a href={selectedApplication.linkedin_url} target="_blank" rel="noopener noreferrer"
                     className="text-violet-600 hover:underline">{selectedApplication.linkedin_url}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showInterviewModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Schedule Interview</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowInterviewModal(false)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Scheduling interview for <strong>{selectedApplication.applicant_name}</strong>
              </p>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Interview Type
                </label>
                <select
                  value={interviewForm.interview_type}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, interview_type: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                >
                  {interviewTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewForm.scheduled_at}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, scheduled_at: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={interviewForm.duration_minutes}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 60 }))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Link (optional)
                </label>
                <input
                  type="url"
                  value={interviewForm.meeting_link}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, meeting_link: e.target.value }))}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={interviewForm.location}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Office address or online"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowInterviewModal(false)}>
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={submitInterview}
                  disabled={isSubmitting || !interviewForm.scheduled_at}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
