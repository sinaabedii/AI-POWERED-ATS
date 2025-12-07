'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/api';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface JobFilterProps {
  categories: Category[];
  onFilterChange: (filters: Record<string, string>) => void;
}

export function JobFilter({ categories, onFilterChange }: JobFilterProps) {
  const [filters, setFilters] = useState({
    category: '',
    job_type: '',
    experience_level: '',
    is_remote: '',
  });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Remove empty values
    const cleanFilters: Record<string, string> = {};
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) cleanFilters[k] = v;
    });
    onFilterChange(cleanFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      job_type: '',
      experience_level: '',
      is_remote: '',
    });
    onFilterChange({});
  };

  const hasFilters = Object.values(filters).some(v => v);

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <FunnelIcon className="h-5 w-5" />
            Filters
          </h3>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1"
            >
              <XMarkIcon className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.jobs_count || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Job Type
            </label>
            <select
              value={filters.job_type}
              onChange={(e) => handleChange('job_type', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Types</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Experience Level
            </label>
            <select
              value={filters.experience_level}
              onChange={(e) => handleChange('experience_level', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead/Manager</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          {/* Remote */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Work Location
            </label>
            <select
              value={filters.is_remote}
              onChange={(e) => handleChange('is_remote', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Locations</option>
              <option value="true">Remote Only</option>
              <option value="false">On-site Only</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
