import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { JobForm } from "../../components/jobs/JobForm";
import { Button } from "../../components/common/Button";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../../services/mockData";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Job } from "../../types/job";

export function JobsManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJob = () => {
    setSelectedJob(null);
    setIsFormVisible(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsFormVisible(true);
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/dashboard/jobs/${jobId}`);
  };

  const handleViewApplicants = (jobId: string) => {
    navigate(`/dashboard/jobs/${jobId}/applicants`);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) {
      return;
    }

    setIsDeleting(jobId);
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSubmitJob = async (jobData: Omit<Job, "id">) => {
    setIsSubmitting(true);
    try {
      if (selectedJob) {
        const updatedJob = await updateJob(selectedJob.id, jobData);
        if (updatedJob) {
          setJobs(
            jobs.map((job) => (job.id === selectedJob.id ? updatedJob : job))
          );
        }
      } else {
        const newJob = await createJob(jobData);
        setJobs([...jobs, newJob]);
      }
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setSelectedJob(null);
  };

  if (isFormVisible) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {selectedJob ? "Edit Job" : "Create New Job"}
            </h1>
          </div>

          <div className="rounded-lg bg-white p-4 sm:p-6 shadow dark:bg-gray-800">
            <JobForm
              job={selectedJob || undefined}
              onSubmit={handleSubmitJob}
              onCancel={handleCancelForm}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Jobs Management
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Create, edit, and manage job postings
            </p>
          </div>
          <Button
            onClick={handleCreateJob}
            leftIcon={<PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            Create Job
          </Button>
        </div>

        {isLoading ? (
          <div className="flex h-40 sm:h-48 items-center justify-center">
            <div className="text-center">
              <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent mx-auto"></div>
              <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Loading jobs...
              </p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 sm:p-6 text-center dark:border-gray-600 dark:bg-gray-800">
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No jobs
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new job posting.
            </p>
            <div className="mt-4 sm:mt-6">
              <Button
                onClick={handleCreateJob}
                className="text-sm sm:text-base"
              >
                <PlusIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Create Job
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="sm:hidden space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {job.category} • {job.location}
                      </p>
                    </div>
                    <span
                      className={`h-fit inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        job.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>

                  <div className="mt-3 flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleViewJob(job.id)}
                      className="flex items-center text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Details
                    </button>
                    <button
                      onClick={() => handleViewApplicants(job.id)}
                      className="flex items-center text-xs text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      Applicants
                    </button>
                    <button
                      onClick={() => handleEditJob(job)}
                      className="flex items-center text-xs text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={isDeleting === job.id}
                      className={`flex items-center text-xs ${
                        isDeleting === job.id
                          ? "cursor-not-allowed text-gray-400"
                          : "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      }`}
                    >
                      {isDeleting === job.id ? (
                        <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
                      ) : (
                        <TrashIcon className="h-4 w-4 mr-1" />
                      )}
                      Delete
                    </button>
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
                        Job Title
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Posted Date
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
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                            {job.title}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {job.category}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {job.location}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              job.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {job.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium">
                          <div className="flex justify-end space-x-2 sm:space-x-3">
                            <button
                              onClick={() => handleViewJob(job.id)}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              title="View Job Details"
                            >
                              <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleViewApplicants(job.id)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View Applicants"
                            >
                              <UserGroupIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleEditJob(job)}
                              className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                              title="Edit Job"
                            >
                              <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              disabled={isDeleting === job.id}
                              className={`${
                                isDeleting === job.id
                                  ? "cursor-not-allowed text-gray-400"
                                  : "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              }`}
                              title="Delete Job"
                            >
                              {isDeleting === job.id ? (
                                <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
                              ) : (
                                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              )}
                            </button>
                          </div>
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
