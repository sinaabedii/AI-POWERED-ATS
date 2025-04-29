import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { Button } from "../../components/common/Button";
import { getJobById } from "../../services/mockData";
import { useAuth } from "../../contexts/AuthContext";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Job } from "../../types/job";
import { JobApplicationForm } from "../../components/jobs/JobApplicationForm";

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);

  const fetchJob = async (jobId: string) => {
    setIsLoading(true);
    try {
      const data = await getJobById(jobId);
      if (data) {
        setJob(data);
      } else {
        setError("Job not found");
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to load job details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/jobs/${id}` } });
      return;
    }

    setShowApplicationForm(true);
  };

  const handleCancelApplication = () => {
    setShowApplicationForm(false);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container-custom mx-auto py-16">
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
            <span className="ml-2">Loading job details...</span>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !job) {
    return (
      <PageLayout>
        <div className="container-custom mx-auto py-16">
          <div className="rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {error || "Job not found"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              The job you are looking for may have been removed or does not
              exist.
            </p>
            <Link to="/jobs">
              <Button className="mt-4">Browse All Jobs</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const postedDate = new Date(job.postedDate);
  const now = new Date();
  const differenceInTime = now.getTime() - postedDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const daysAgo =
    differenceInDays === 0
      ? "Today"
      : differenceInDays === 1
      ? "Yesterday"
      : `${differenceInDays} days ago`;

  return (
    <PageLayout>
      <div className="bg-gray-900 py-16">
        <div className="container-custom mx-auto">
          <Link
            to="/jobs"
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
                  Posted {daysAgo}
                </span>
              </div>
            </div>

            {!showApplicationForm && (
              <div className="mt-6 md:mt-0">
                <Button size="lg" onClick={handleApplyClick}>
                  <ClipboardDocumentCheckIcon className="mr-2 h-5 w-5" />
                  Apply Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom mx-auto py-12">
        {showApplicationForm ? (
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Apply for: {job.title}
            </h2>
            <JobApplicationForm job={job} onCancel={handleCancelApplication} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Job Description
                  </h2>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    About the Role
                  </h2>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {job.summary}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Responsibilities
                  </h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Requirements
                  </h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    About the Company
                  </h2>
                  {/* <p className="mt-4 text-gray-700 dark:text-gray-300">{job.about}</p> */}
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
                    Ready to apply for this position? Click the button below to
                    submit your application.
                  </p>
                  <Button className="mt-6 w-full" onClick={handleApplyClick}>
                    Apply Now
                  </Button>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Job Overview
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Job Category
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                        {job.category}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Location
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                        {job.location}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Posted Date
                      </h3>
                      <p className="text-base text-gray-900 dark:text-white">
                        {new Date(job.postedDate).toLocaleDateString()}
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

                <div className="rounded-lg bg-primary-50 p-6 shadow dark:bg-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Share this Job
                  </h2>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                    >
                      <span className="sr-only">Share on LinkedIn</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                    >
                      <span className="sr-only">Share on Twitter</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                    >
                      <span className="sr-only">Share via Email</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
