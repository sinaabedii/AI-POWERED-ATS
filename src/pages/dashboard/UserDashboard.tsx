import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Button } from "../../components/common/Button";
import { getApplicationsByUserId } from "../../services/mockData";
import { useAuth } from "../../contexts/AuthContext";
import {
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Application } from "../../types/applicant";

const getStatusBadgeClass = (status: Application["status"]) => {
  switch (status) {
    case "pending":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "reviewed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "shortlisted":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
    case "interview":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "offered":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "hired":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

export function UserDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const data = await getApplicationsByUserId(user.id);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusLabel = (status: Application["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              My Applications
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Track the status of your job applications
            </p>
          </div>
          <Link to="/jobs">
            <Button className="w-full sm:w-auto text-sm sm:text-base">
              Browse More Jobs
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex h-40 sm:h-48 items-center justify-center">
            <div className="text-center">
              <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent mx-auto"></div>
              <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Loading your applications...
              </p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 sm:p-6 text-center dark:border-gray-600 dark:bg-gray-800">
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No applications yet
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              You haven't applied to any jobs yet.
            </p>
            <div className="mt-4 sm:mt-6">
              <Link to="/jobs">
                <Button className="text-sm sm:text-base">Browse Jobs</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                <div className="p-3 sm:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                          Total
                        </dt>
                        <dd>
                          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                            {applications.length}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                <div className="p-3 sm:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                          Under Review
                        </dt>
                        <dd>
                          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                            {
                              applications.filter(
                                (app) =>
                                  app.status === "pending" ||
                                  app.status === "reviewed"
                              ).length
                            }
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                <div className="p-3 sm:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 text-green-400"
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
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                          Successful
                        </dt>
                        <dd>
                          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                            {
                              applications.filter(
                                (app) =>
                                  app.status === "offered" ||
                                  app.status === "hired"
                              ).length
                            }
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                <div className="p-3 sm:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 text-red-400"
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
                    </div>
                    <div className="ml-3 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                          Rejected
                        </dt>
                        <dd>
                          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                            {
                              applications.filter(
                                (app) => app.status === "rejected"
                              ).length
                            }
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:hidden space-y-3">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Job #{application.jobId}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                        application.status
                      )}`}
                    >
                      {getStatusLabel(application.status)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    Applied:{" "}
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Link
                      to={`/dashboard/my-applications/${application.id}`}
                      className="flex items-center text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <EyeIcon className="mr-1 h-3 w-3" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:block overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 dark:border-gray-700 dark:bg-gray-700">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  Your Applications
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Job Title
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Applied Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative px-4 sm:px-6 py-2 sm:py-3"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                            Job #{application.jobId}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {new Date(
                              application.appliedDate
                            ).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                              application.status
                            )}`}
                          >
                            {getStatusLabel(application.status)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium">
                          <Link
                            to={`/dashboard/my-applications/${application.id}`}
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
    </DashboardLayout>
  );
}
