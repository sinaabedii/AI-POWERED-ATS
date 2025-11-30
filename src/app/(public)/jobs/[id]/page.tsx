import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getJobById, getJobs } from '@/lib/data';
import { getDaysAgo, formatDate } from '@/lib/utils';
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { JobApplyButton } from './job-apply-button';

interface JobDetailPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const jobs = getJobs();
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const job = getJobById(params.id);
  if (!job) return { title: 'Job Not Found' };
  return {
    title: `${job.title} | ATS System`,
    description: job.description,
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-gray-900 py-16">
        <div className="container-custom mx-auto">
          <Link
            href="/jobs"
            className="mb-6 inline-flex items-center text-gray-300 hover:text-white"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Back to Jobs
          </Link>

          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{job.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-300">
                <span className="flex items-center">
                  <BriefcaseIcon className="mr-1.5 h-5 w-5" />
                  {job.category}
                </span>
                <span className="flex items-center">
                  <MapPinIcon className="mr-1.5 h-5 w-5" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <CalendarIcon className="mr-1.5 h-5 w-5" />
                  Posted {getDaysAgo(job.postedDate)}
                </span>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <JobApplyButton jobId={job.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom mx-auto py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Description</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{job.description}</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">About the Role</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{job.summary}</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Responsibilities</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Requirements</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-8 space-y-8">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Apply for this Job
                </h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Ready to apply for this position? Click the button below to submit your
                  application.
                </p>
                <div className="mt-6">
                  <JobApplyButton jobId={job.id} fullWidth />
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Overview</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Job Category
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">{job.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">{job.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Posted Date
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">
                      {formatDate(job.postedDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Job Status
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">
                      {job.isActive ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                          Inactive
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
