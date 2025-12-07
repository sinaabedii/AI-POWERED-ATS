'use client';

import { useState, useEffect, useCallback } from 'react';
import api, { Job, Category, PaginatedResponse, ApiError } from '@/lib/api';

interface UseJobsOptions {
  initialParams?: Record<string, string>;
  autoFetch?: boolean;
}

export function useJobs(options: UseJobsOptions = {}) {
  const { initialParams = {}, autoFetch = true } = options;
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const fetchJobs = useCallback(async (params: Record<string, string> = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getJobs({ ...initialParams, ...params });
      setJobs(response.results);
      setPagination({
        count: response.count,
        next: response.next,
        previous: response.previous,
      });
    } catch (err) {
      setError(err instanceof ApiError ? 'Failed to load jobs' : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [initialParams]);

  useEffect(() => {
    if (autoFetch) {
      fetchJobs();
    }
  }, [autoFetch, fetchJobs]);

  return { jobs, isLoading, error, pagination, fetchJobs, setJobs };
}

export function useJob(slug: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getJob(slug);
        setJob(data);
      } catch (err) {
        setError(err instanceof ApiError ? 'Job not found' : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchJob();
    }
  }, [slug]);

  return { job, isLoading, error };
}

export function useFeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      setIsLoading(true);
      try {
        const data = await api.getFeaturedJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to load featured jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return { jobs, isLoading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.getSavedJobs();
      setSavedJobs(response.results.map(item => item.job));
    } catch (err) {
      setError('Failed to load saved jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveJob = async (jobId: number) => {
    try {
      await api.saveJob(jobId);
      await fetchSavedJobs();
      return true;
    } catch {
      return false;
    }
  };

  const unsaveJob = async (jobId: number) => {
    try {
      await api.unsaveJob(jobId);
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return { savedJobs, isLoading, error, saveJob, unsaveJob, refetch: fetchSavedJobs };
}

// Job Management for Recruiters
export function useJobsManage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ count: 0, next: null as string | null, previous: null as string | null });

  const fetchJobs = useCallback(async (params?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getJobsManage(params);
      setJobs(response.results);
      setPagination({ count: response.count, next: response.next, previous: response.previous });
    } catch {
      setError('Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createJob = async (data: Partial<Job>) => {
    try {
      const job = await api.createJob(data);
      setJobs(prev => [job, ...prev]);
      return { success: true, job };
    } catch {
      return { success: false, error: 'Failed to create job' };
    }
  };

  const updateJob = async (id: number, data: Partial<Job>) => {
    try {
      const job = await api.updateJob(id, data);
      setJobs(prev => prev.map(j => j.id === id ? job : j));
      return { success: true, job };
    } catch {
      return { success: false, error: 'Failed to update job' };
    }
  };

  const deleteJob = async (id: number) => {
    try {
      await api.deleteJobManage(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const toggleActive = async (id: number) => {
    try {
      const result = await api.toggleJobActive(id);
      setJobs(prev => prev.map(j => j.id === id ? { ...j, is_active: result.is_active } : j));
      return true;
    } catch {
      return false;
    }
  };

  const toggleFeatured = async (id: number) => {
    try {
      const result = await api.toggleJobFeatured(id);
      setJobs(prev => prev.map(j => j.id === id ? { ...j, is_featured: result.is_featured } : j));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, isLoading, error, pagination, fetchJobs, createJob, updateJob, deleteJob, toggleActive, toggleFeatured };
}
