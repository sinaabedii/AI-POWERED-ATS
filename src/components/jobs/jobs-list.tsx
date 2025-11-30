'use client';

import { useState } from 'react';
import { JobCard } from './job-card';
import { JobFilter } from './job-filter';
import { Job, JobCategory } from '@/types';

interface JobsListProps {
  initialJobs: Job[];
  categories: Record<JobCategory, number>;
}

export function JobsList({ initialJobs, categories }: JobsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('All');

  const filteredJobs =
    selectedCategory === 'All'
      ? initialJobs
      : initialJobs.filter((job) => job.category === selectedCategory);

  return (
    <div className="space-y-8">
      <JobFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredJobs.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No jobs found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
