import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { JobDetailHeader } from '../../components/jobs/JobDetailHeader';
import { JobDetail } from '../../components/jobs/JobDetail';
import { ApplyForm } from '../../components/jobs/ApplyForm';
import { Job } from '../../types/job';
import { getJob } from '../../services/mockData';
import { Tabs } from '../../components/common/Tabs';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error('Job ID is required');
        }
        
        const jobData = await getJob(id);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading job details...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !job) {
    return (
      <PageLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Not Found</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {error || 'The job you are looking for does not exist.'}
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <JobDetailHeader job={job} />
      
      <div className="container-custom mx-auto py-8">
        <Tabs
          tabs={[
            {
              id: 'details',
              label: 'Job Details',
              content: <JobDetail job={job} />,
            },
            {
              id: 'apply',
              label: 'Apply',
              content: <ApplyForm job={job} />,
            },
          ]}
        />
      </div>
    </PageLayout>
  );
}