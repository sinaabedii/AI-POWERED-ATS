'use client';

import { useState, useEffect } from 'react';
import { JobCard } from '@/components/jobs/job-card';
import { JobFilter } from '@/components/jobs/job-filter';
import { useJobs, useCategories } from '@/hooks/useJobs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function JobsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const { jobs, isLoading, error, fetchJobs } = useJobs({ autoFetch: true });
  const { categories } = useCategories();

  useEffect(() => {
    const params: Record<string, string> = { ...filters };
    if (searchTerm) {
      params.search = searchTerm;
    }
    fetchJobs(params);
  }, [filters, searchTerm, fetchJobs]);

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-950" />
        </div>

        <div className="container-custom relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-8">
            Discover opportunities that match your skills and aspirations
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title, company, or location..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <JobFilter 
                categories={categories} 
                onFilterChange={handleFilterChange} 
              />
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse">
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4" />
                      <div className="flex gap-2">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400">No jobs found matching your criteria</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Showing {jobs.length} jobs
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
