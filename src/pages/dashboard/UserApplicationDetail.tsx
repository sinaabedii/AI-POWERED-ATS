import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Button } from "../../components/common/Button";
import { getApplicationById, getJobById } from "../../services/mockData";
import { ChevronLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { Application } from "../../types/applicant";
import { Job } from "../../types/job";

const getStatusInfo = (status: Application["status"]) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending Review",
        description:
          "Your application has been received and is pending review by our team.",
        color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      };
    case "reviewed":
      return {
        label: "Application Reviewed",
        description:
          "Your application has been reviewed by our recruitment team.",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      };
    case "shortlisted":
      return {
        label: "Shortlisted",
        description:
          "Congratulations! Your application has been shortlisted for further consideration.",
        color:
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      };
    case "interview":
      return {
        label: "Interview Stage",
        description:
          "You have been selected for an interview. Our team will contact you soon with more details.",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      };
    case "offered":
      return {
        label: "Job Offered",
        description:
          "Congratulations! You have been offered this position. Please check your email for details.",
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      };
    case "hired":
      return {
        label: "Hired",
        description: "Congratulations! You have been hired for this position.",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      };
    case "rejected":
      return {
        label: "Not Selected",
        description:
          "We appreciate your interest, but we have decided to move forward with other candidates at this time.",
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      };
    default:
      return {
        label: "Unknown",
        description: "The status of your application is currently unknown.",
        color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      };
  }
};

export function UserApplicationDetail() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (applicationId && user) {
      fetchData(applicationId);
    }
  }, [applicationId, user]);

  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const applicationData = await getApplicationById(id);

      if (applicationData && applicationData.userId === user?.id) {
        setApplication(applicationData);

        if (applicationData.jobId) {
          const jobData = await getJobById(applicationData.jobId);
          setJob(jobData || null);
        }
      } else {
        setError("You do not have permission to view this application");
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
      setError("Failed to load application details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !application || !job) {
    return (
      <DashboardLayout>
        <div className="rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {error || "Application not found"}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {error
              ? error
              : "The application you are looking for does not exist."}
          </p>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const statusInfo = getStatusInfo(application.status);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Application Status:{" "}
              <span
                className={`rounded-full px-2 py-1 text-sm ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </h1>
          </div>
          <div className="p-6">
            <div className={`mb-6 rounded-lg ${statusInfo.color} p-4`}>
              <p className="text-sm">{statusInfo.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Application Details
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Applied On
                    </h3>
                    <p className="mt-1 text-base text-gray-900 dark:text-white">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>

                  {application.matchScore && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Match Score
                      </h3>
                      <div className="mt-1 flex items-center">
                        <div className="mr-2 h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-primary-500"
                            style={{ width: `${application.matchScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.matchScore}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Skills Listed
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {application.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <DocumentTextIcon className="mr-1 h-5 w-5" />
                    Resume
                  </h3>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <DocumentTextIcon className="mr-2 h-5 w-5" />
                        View Your Resume
                      </a>
                    </Button>
                  </div>
                </div>

                {application.coverLetter && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Your Cover Letter
                    </h3>
                    <div className="mt-2 rounded-md border border-gray-200 p-4 dark:border-gray-700">
                      <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                        {application.coverLetter}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Job Details
                </h2>
                <div className="mt-4">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {job.category} • {job.location}
                  </p>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Requirements
                    </h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li>
                          And {job.requirements.length - 3} more requirements...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        View Full Job Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {application.status === "pending" && (
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                          Application Under Review
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                          <p>
                            Your application is still being reviewed. We'll
                            notify you when there's an update.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {application.status === "interview" && (
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                          Interview Coming Up
                        </h3>
                        <div className="mt-2 text-sm text-green-700 dark:text-green-200">
                          <p>
                            You've been selected for an interview! Our HR team
                            will contact you soon to schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {application.status === "rejected" && (
                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          Other Opportunities
                        </h3>
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          <p>
                            We encourage you to explore other positions that
                            might be a better fit for your skills and
                            experience.
                          </p>
                        </div>
                        <div className="mt-4">
                          <Link to="/jobs">
                            <Button size="sm">Browse Other Jobs</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
