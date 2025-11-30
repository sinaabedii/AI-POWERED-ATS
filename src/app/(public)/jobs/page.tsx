import { JobsList } from '@/components/jobs/jobs-list';
import { getJobs, getCategoriesWithCount } from '@/lib/data';

export const metadata = {
  title: 'Open Positions | ATS System',
  description: 'Browse our open positions and find your dream job',
};

export default function JobsPage() {
  const jobs = getJobs();
  const categories = getCategoriesWithCount();

  return (
    <section className="py-8">
      <div className="container-custom mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Open Positions</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Find the perfect job that matches your skills and career goals
          </p>
        </div>

        <JobsList initialJobs={jobs} categories={categories} />
      </div>
    </section>
  );
}
