'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { getApplicationsByUserId } from '@/lib/data';
import { getStatusBadgeClass } from '@/lib/utils';
import { EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const applications = user ? getApplicationsByUserId(user.id) : [];

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Track the status of your job applications
          </p>
        </div>
        <Link href="/jobs">
          <Button className="mt-4 sm:mt-0">Browse More Jobs</Button>
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-600 dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">No applications yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You haven&apos;t applied to any jobs yet.
          </p>
          <div className="mt-6">
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {applications.length}
                  </dd>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <EyeIcon className="h-6 w-6 text-yellow-400" />
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Under Review
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {
                      applications.filter(
                        (app) => app.status === 'pending' || app.status === 'reviewed'
                      ).length
                    }
                  </dd>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Successful
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {
                      applications.filter(
                        (app) => app.status === 'offered' || app.status === 'hired'
                      ).length
                    }
                  </dd>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {applications.filter((app) => app.status === 'rejected').length}
                  </dd>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Your Applications
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Status
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Job #{application.jobId}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(application.appliedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                            application.status
                          )}`}
                        >
                          {getStatusLabel(application.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <Link
                          href={`/dashboard/my-applications/${application.id}`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
