import { useState, useEffect } from 'react';
import { JobCard } from './JobCard';
import { JobFilter } from './JobFilter';
import { Job, JobCategory } from '../../types/job';
import { getJobs, getCategoriesWithCount } from '../../services/mockData';

export function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Record<JobCategory, number>>({} as Record<JobCategory, number>);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await getCategoriesWithCount();
        setCategories(categoriesData);
        
        const jobsData = await getJobs(selectedCategory);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category: JobCategory) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <JobFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {jobs.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            No jobs found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}