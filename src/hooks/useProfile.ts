'use client';

import { useState, useEffect, useCallback } from 'react';
import api, { UserSkill, UserExperience } from '@/lib/api';

export function useUserSkills() {
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getUserSkills();
      setSkills(data);
    } catch {
      setError('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addSkill = async (data: { name: string; level: number }) => {
    try {
      const skill = await api.addUserSkill(data);
      setSkills(prev => [...prev, skill]);
      return { success: true, skill };
    } catch {
      return { success: false, error: 'Failed to add skill' };
    }
  };

  const updateSkill = async (id: number, data: { name?: string; level?: number }) => {
    try {
      const skill = await api.updateUserSkill(id, data);
      setSkills(prev => prev.map(s => s.id === id ? skill : s));
      return { success: true, skill };
    } catch {
      return { success: false, error: 'Failed to update skill' };
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      await api.deleteUserSkill(id);
      setSkills(prev => prev.filter(s => s.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, isLoading, error, fetchSkills, addSkill, updateSkill, deleteSkill };
}

export function useUserExperiences() {
  const [experiences, setExperiences] = useState<UserExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getUserExperiences();
      setExperiences(data);
    } catch {
      setError('Failed to load experiences');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addExperience = async (data: {
    company: string;
    title: string;
    location?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
  }) => {
    try {
      const experience = await api.addUserExperience(data);
      setExperiences(prev => [experience, ...prev]);
      return { success: true, experience };
    } catch {
      return { success: false, error: 'Failed to add experience' };
    }
  };

  const updateExperience = async (id: number, data: Partial<UserExperience>) => {
    try {
      const experience = await api.updateUserExperience(id, data);
      setExperiences(prev => prev.map(e => e.id === id ? experience : e));
      return { success: true, experience };
    } catch {
      return { success: false, error: 'Failed to update experience' };
    }
  };

  const deleteExperience = async (id: number) => {
    try {
      await api.deleteUserExperience(id);
      setExperiences(prev => prev.filter(e => e.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return { experiences, isLoading, error, fetchExperiences, addExperience, updateExperience, deleteExperience };
}
