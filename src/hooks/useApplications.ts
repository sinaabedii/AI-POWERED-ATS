'use client';

import { useState, useEffect, useCallback } from 'react';
import api, { Application, ApiError } from '@/lib/api';

export function useMyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getMyApplications();
      setApplications(response.results);
    } catch (err) {
      setError('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyToJob = async (data: { 
    job: number; 
    cover_letter?: string; 
    portfolio_url?: string; 
    linkedin_url?: string 
  }) => {
    try {
      const application = await api.applyToJob(data);
      setApplications(prev => [application, ...prev]);
      return { success: true, application };
    } catch (err) {
      const message = err instanceof ApiError 
        ? 'Failed to submit application' 
        : 'An error occurred';
      return { success: false, error: message };
    }
  };

  const withdrawApplication = async (id: number) => {
    try {
      await api.withdrawApplication(id);
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: 'withdrawn' as const } : app
        )
      );
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => ['pending', 'reviewed'].includes(a.status)).length,
    interviews: applications.filter(a => a.status === 'interview').length,
    offers: applications.filter(a => ['offered', 'hired'].includes(a.status)).length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return { 
    applications, 
    isLoading, 
    error, 
    stats,
    applyToJob, 
    withdrawApplication, 
    refetch: fetchApplications 
  };
}

// Application Management for Recruiters
export function useApplicationsManage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ count: 0, next: null as string | null, previous: null as string | null });

  const fetchApplications = useCallback(async (params?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getApplicationsManage(params);
      setApplications(response.results);
      setPagination({ count: response.count, next: response.next, previous: response.previous });
    } catch {
      setError('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (id: number, status: string, notes?: string) => {
    try {
      const application = await api.updateApplicationStatus(id, status, notes);
      setApplications(prev => prev.map(a => a.id === id ? application : a));
      return { success: true, application };
    } catch {
      return { success: false, error: 'Failed to update status' };
    }
  };

  const addNotes = async (id: number, notes: string) => {
    try {
      await api.addApplicationNotes(id, notes);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, internal_notes: notes } : a));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offered: applications.filter(a => a.status === 'offered').length,
    hired: applications.filter(a => a.status === 'hired').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return { 
    applications, 
    isLoading, 
    error, 
    pagination,
    stats,
    fetchApplications, 
    updateStatus,
    addNotes,
  };
}
