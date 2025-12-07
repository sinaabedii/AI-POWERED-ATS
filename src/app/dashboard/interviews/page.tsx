'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInterviews } from '@/hooks/useInterviews';
import {
  CalendarIcon,
  ClockIcon,
  VideoCameraIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserGroupIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | 'scheduled' | 'completed' | 'cancelled';

const interviewTypeIcons: Record<string, React.ElementType> = {
  phone: PhoneIcon,
  video: VideoCameraIcon,
  onsite: BuildingOfficeIcon,
  technical: BuildingOfficeIcon,
  final: UserGroupIcon,
};

const statusColors: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  rescheduled: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  no_show: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default function InterviewsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const { interviews, isLoading, stats, completeInterview, cancelInterview } = useInterviews();

  const filteredInterviews = interviews.filter(interview => {
    if (statusFilter === 'all') return true;
    return interview.status === statusFilter;
  });

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Interviews</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage and track all scheduled interviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.scheduled}</p>
                <p className="text-sm text-slate-500">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-xl">
                <ClockIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.upcoming}</p>
                <p className="text-sm text-slate-500">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.completed}</p>
                <p className="text-sm text-slate-500">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-xl">
                <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.cancelled}</p>
                <p className="text-sm text-slate-500">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <FunnelIcon className="h-5 w-5 text-slate-400" />
            <div className="flex gap-2">
              {(['all', 'scheduled', 'completed', 'cancelled'] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    statusFilter === status
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviews List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredInterviews.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No interviews found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {statusFilter !== 'all' ? 'Try changing the filter' : 'No interviews scheduled yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map((interview) => {
            const { date, time } = formatDateTime(interview.scheduled_at);
            const TypeIcon = interviewTypeIcons[interview.interview_type] || CalendarIcon;

            return (
              <Card key={interview.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Type Icon */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                        <TypeIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {interview.interview_type_display || interview.interview_type.replace('_', ' ')}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {interview.duration_minutes} minutes
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-slate-500">{date}</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{time}</p>
                      </div>

                      {/* Location/Link */}
                      <div className="text-sm text-slate-500 max-w-xs truncate">
                        {interview.meeting_link ? (
                          <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                            Join Meeting
                          </a>
                        ) : interview.location || 'No location set'}
                      </div>

                      {/* Status */}
                      <Badge className={statusColors[interview.status]}>
                        {interview.status_display || interview.status}
                      </Badge>

                      {/* Actions */}
                      {interview.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const feedback = prompt('Enter feedback:');
                              const rating = prompt('Enter rating (1-5):');
                              if (feedback) {
                                completeInterview(interview.id, feedback, rating ? Number(rating) : undefined);
                              }
                            }}
                          >
                            Complete
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelInterview(interview.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}

                      {/* Rating */}
                      {interview.status === 'completed' && interview.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < interview.rating! ? 'text-amber-400' : 'text-slate-300'}>★</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Feedback */}
                  {interview.feedback && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium">Feedback:</span> {interview.feedback}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
