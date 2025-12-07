'use client';

import { useState, useEffect, useCallback } from 'react';
import api, { User, Job, Category, Application, AdminOverview, ApiError } from '@/lib/api';

// Admin Users Hook
export function useAdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ count: 0, next: null as string | null, previous: null as string | null });

  const fetchUsers = useCallback(async (params?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.adminGetUsers(params);
      setUsers(response.results);
      setPagination({ count: response.count, next: response.next, previous: response.previous });
    } catch {
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = async (data: Partial<User> & { password: string }) => {
    try {
      const user = await api.adminCreateUser(data);
      setUsers(prev => [user, ...prev]);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: 'Failed to create user' };
    }
  };

  const updateUser = async (id: number, data: Partial<User>) => {
    try {
      const user = await api.adminUpdateUser(id, data);
      setUsers(prev => prev.map(u => u.id === id ? user : u));
      return { success: true, user };
    } catch {
      return { success: false, error: 'Failed to update user' };
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.adminDeleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const activateUser = async (id: number) => {
    try {
      await api.adminActivateUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: true } : u));
      return true;
    } catch {
      return false;
    }
  };

  const deactivateUser = async (id: number) => {
    try {
      await api.adminDeactivateUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: false } : u));
      return true;
    } catch {
      return false;
    }
  };

  const changeRole = async (id: number, role: string) => {
    try {
      await api.adminChangeUserRole(id, role);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: role as User['role'] } : u));
      return true;
    } catch {
      return false;
    }
  };

  const verifyUser = async (id: number) => {
    try {
      await api.adminVerifyUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_verified: true } : u));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { 
    users, isLoading, error, pagination,
    fetchUsers, createUser, updateUser, deleteUser,
    activateUser, deactivateUser, changeRole, verifyUser
  };
}

// Admin Jobs Hook
export function useAdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ count: 0, next: null as string | null, previous: null as string | null });

  const fetchJobs = useCallback(async (params?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.adminGetJobs(params);
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
      const job = await api.adminCreateJob(data);
      setJobs(prev => [job, ...prev]);
      return { success: true, job };
    } catch {
      return { success: false, error: 'Failed to create job' };
    }
  };

  const updateJob = async (id: number, data: Partial<Job>) => {
    try {
      const job = await api.adminUpdateJob(id, data);
      setJobs(prev => prev.map(j => j.id === id ? job : j));
      return { success: true, job };
    } catch {
      return { success: false, error: 'Failed to update job' };
    }
  };

  const deleteJob = async (id: number) => {
    try {
      await api.adminDeleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, isLoading, error, pagination, fetchJobs, createJob, updateJob, deleteJob };
}

// Admin Categories Hook
export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.adminGetCategories();
      setCategories(response.results);
    } catch {
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCategory = async (data: Partial<Category>) => {
    try {
      const category = await api.adminCreateCategory(data);
      setCategories(prev => [category, ...prev]);
      return { success: true, category };
    } catch {
      return { success: false, error: 'Failed to create category' };
    }
  };

  const updateCategory = async (id: number, data: Partial<Category>) => {
    try {
      const category = await api.adminUpdateCategory(id, data);
      setCategories(prev => prev.map(c => c.id === id ? category : c));
      return { success: true, category };
    } catch {
      return { success: false, error: 'Failed to update category' };
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await api.adminDeleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, error, fetchCategories, createCategory, updateCategory, deleteCategory };
}

// Admin Applications Hook
export function useAdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ count: 0, next: null as string | null, previous: null as string | null });

  const fetchApplications = useCallback(async (params?: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await api.adminGetApplications(params);
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
      await api.adminUpdateApplicationStatus(id, status, notes);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: status as Application['status'] } : a));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, isLoading, error, pagination, fetchApplications, updateStatus };
}

// Admin Overview Hook
export function useAdminOverview() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      setIsLoading(true);
      try {
        const data = await api.adminGetOverview();
        setOverview(data);
      } catch {
        setError('Failed to load overview');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return { overview, isLoading, error };
}
