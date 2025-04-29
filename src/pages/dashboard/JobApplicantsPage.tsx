import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Button } from "../../components/common/Button";
import {
  getJobById,
  getApplicationsByJobId,
  updateApplication,
  analyzeResume,
} from "../../services/mockData";
import {
  ChevronLeftIcon,
  DocumentMagnifyingGlassIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Job } from "../../types/job";
import { Application, ApplicationStatus } from "../../types/applicant";

const getStatusBadgeClass = (status: ApplicationStatus) => {
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

const statusOptions: ApplicationStatus[] = [
  "pending",
  "reviewed",
  "shortlisted",
  "interview",
  "offered",
  "hired",
  "rejected",
];

export function JobApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      fetchData(jobId);
    }
  }, [jobId]);

  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const [jobData, applicationsData] = await Promise.all([
        getJobById(id),
        getApplicationsByJobId(id),
      ]);
      setJob(jobData || null);
      setApplications(applicationsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (
    applicationId: string,
    status: ApplicationStatus
  ) => {
    setUpdatingStatus(applicationId);
    try {
      const updatedApplication = await updateApplication(applicationId, {
        status,
      });
      if (updatedApplication) {
        setApplications(
          applications.map((app) =>
            app.id === applicationId ? updatedApplication : app
          )
        );
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleAnalyzeResume = async (applicationId: string) => {
    setAnalyzing(applicationId);
    try {
      const score = await analyzeResume(applicationId);
      console.log(`Resume analysis complete. Match score: ${score}`);

      setApplications(
        applications.map((app) =>
          app.id === applicationId ? { ...app, matchScore: score } : app
        )
      );

      const application = applications.find((app) => app.id === applicationId);
      if (application && application.status === "pending") {
        await handleStatusChange(applicationId, "reviewed");
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setAnalyzing(null);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-48 sm:h-64 items-center justify-center">
          <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
          <span className="ml-2 text-sm sm:text-base">Loading...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="rounded-lg bg-white p-4 sm:p-6 text-center shadow dark:bg-gray-800 mx-2 sm:mx-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Job not found
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            The job you are looking for does not exist.
          </p>
          <Link to="/dashboard/jobs">
            <Button className="mt-4 text-sm sm:text-base">Back to Jobs</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="flex items-center">
          <Link
            to="/dashboard/jobs"
            className="flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Back to Jobs</span>
          </Link>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Applicants for: {job.title}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {job.location} • {job.category}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-lg bg-white p-4 sm:p-6 text-center shadow dark:bg-gray-800">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              No applications yet
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              There are no applications for this job posting yet.
            </p>
          </div>
        ) : (
          <>
            <div className="sm:hidden space-y-3">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {application.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {application.fullName}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {application.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Applied:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Experience:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {application.experience} years
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Status:
                      </span>
                      {updatingStatus === application.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                      ) : (
                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(
                              application.id,
                              e.target.value as ApplicationStatus
                            )
                          }
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                            application.status
                          )}`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Match Score:
                      </span>
                      {application.matchScore ? (
                        <div className="flex items-center">
                          <div className="mr-1 h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-primary-500"
                              style={{ width: `${application.matchScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">
                            {application.matchScore}%
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAnalyzeResume(application.id)}
                          disabled={analyzing === application.id}
                          className="text-xs py-1 px-2"
                        >
                          {analyzing === application.id ? (
                            <>
                              <div className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <DocumentMagnifyingGlassIcon className="mr-1 h-3 w-3" />
                              Analyze
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Link
                      to={`/dashboard/applications/${application.id}`}
                      className="flex items-center text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <EyeIcon className="mr-1 h-3 w-3" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Applicant
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
                        Experience
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Match Score
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
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                                  {application.fullName
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                                {application.fullName}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {application.email}
                              </div>
                            </div>
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
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {application.experience} years
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          {application.matchScore ? (
                            <div className="flex items-center">
                              <div className="mr-2 h-2 w-16 sm:w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  className="h-2 rounded-full bg-primary-500"
                                  style={{
                                    width: `${application.matchScore}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                                {application.matchScore}%
                              </span>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleAnalyzeResume(application.id)
                              }
                              disabled={analyzing === application.id}
                              className="text-xs sm:text-sm"
                            >
                              {analyzing === application.id ? (
                                <>
                                  <div className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <DocumentMagnifyingGlassIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                  Analyze Resume
                                </>
                              )}
                            </Button>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          {updatingStatus === application.id ? (
                            <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                          ) : (
                            <select
                              value={application.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  application.id,
                                  e.target.value as ApplicationStatus
                                )
                              }
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                                application.status
                              )}`}
                            >
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium">
                          <Link
                            to={`/dashboard/applications/${application.id}`}
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
