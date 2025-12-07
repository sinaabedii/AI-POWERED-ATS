'use client';

import { useState, useEffect, useCallback } from 'react';
import api, { Interview, PaginatedResponse } from '@/lib/api';

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ count: 0, next: null as string | null, previous: null as string | null });

  const fetchInterviews = useCallback(async (params?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getInterviews(params);
      setInterviews(response.results);
      setPagination({ count: response.count, next: response.next, previous: response.previous });
    } catch {
      setError('Failed to load interviews');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const scheduleInterview = async (applicationId: number, data: {
    interview_type: string;
    scheduled_at: string;
    duration_minutes?: number;
    location?: string;
    meeting_link?: string;
    interviewers?: number[];
  }) => {
    try {
      const interview = await api.scheduleInterview(applicationId, data);
      setInterviews(prev => [interview, ...prev]);
      return { success: true, interview };
    } catch {
      return { success: false, error: 'Failed to schedule interview' };
    }
  };

  const updateInterview = async (id: number, data: Partial<Interview>) => {
    try {
      const interview = await api.updateInterview(id, data);
      setInterviews(prev => prev.map(i => i.id === id ? interview : i));
      return { success: true, interview };
    } catch {
      return { success: false, error: 'Failed to update interview' };
    }
  };

  const completeInterview = async (id: number, feedback: string, rating?: number) => {
    try {
      const interview = await api.completeInterview(id, feedback, rating);
      setInterviews(prev => prev.map(i => i.id === id ? interview : i));
      return { success: true, interview };
    } catch {
      return { success: false, error: 'Failed to complete interview' };
    }
  };

  const cancelInterview = async (id: number) => {
    try {
      const interview = await api.cancelInterview(id);
      setInterviews(prev => prev.map(i => i.id === id ? interview : i));
      return true;
    } catch {
      return false;
    }
  };

  const deleteInterview = async (id: number) => {
    try {
      await api.deleteInterview(id);
      setInterviews(prev => prev.filter(i => i.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  // Stats
  const stats = {
    total: interviews.length,
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    cancelled: interviews.filter(i => i.status === 'cancelled').length,
    upcoming: interviews.filter(i => i.is_upcoming).length,
  };

  return {
    interviews,
    isLoading,
    error,
    pagination,
    stats,
    fetchInterviews,
    scheduleInterview,
    updateInterview,
    completeInterview,
    cancelInterview,
    deleteInterview,
  };
}
