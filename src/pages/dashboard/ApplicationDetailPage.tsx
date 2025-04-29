import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Button } from "../../components/common/Button";
import {
  getApplicationById,
  getJobById,
  updateApplication,
} from "../../services/mockData";
import { ChevronLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Application, ApplicationStatus } from "../../types/applicant";
import { Job } from "../../types/job";

const statusOptions: ApplicationStatus[] = [
  "pending",
  "reviewed",
  "shortlisted",
  "interview",
  "offered",
  "hired",
  "rejected",
];

// const getStatusBadgeClass = (status: ApplicationStatus) => {
//   switch (status) {
//     case 'pending':
//       return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     case 'reviewed':
//       return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//     case 'shortlisted':
//       return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
//     case 'interview':
//       return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
//     case 'offered':
//       return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
//     case 'hired':
//       return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//     case 'rejected':
//       return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
//     default:
//       return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//   }
// };

export function ApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("pending");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (applicationId) {
      fetchData(applicationId);
    }
  }, [applicationId]);

  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const applicationData = await getApplicationById(id);
      if (applicationData) {
        setApplication(applicationData);
        setNotes(applicationData.notes || "");
        setStatus(applicationData.status);

        if (applicationData.jobId) {
          const jobData = await getJobById(applicationData.jobId);
          setJob(jobData || null);
        }
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!application) return;

    setIsSaving(true);
    try {
      const updatedApplication = await updateApplication(application.id, {
        notes,
        status,
      });

      if (updatedApplication) {
        setApplication(updatedApplication);
        alert("Application updated successfully");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Failed to update application");
    } finally {
      setIsSaving(false);
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

  if (!application || !job) {
    return (
      <DashboardLayout>
        <div className="rounded-lg bg-white p-4 sm:p-6 text-center shadow dark:bg-gray-800 mx-2 sm:mx-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Application not found
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            The application you are looking for does not exist.
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
            to={`/dashboard/jobs/${job.id}/applicants`}
            className="flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Back to Applicants</span>
          </Link>
        </div>

        <div className="block sm:hidden space-y-4">
          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application Status
              </h2>
            </div>
            <div className="px-4 py-3">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="status-mobile"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Status
                  </label>
                  <select
                    id="status-mobile"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as ApplicationStatus)
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full text-sm"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {application.fullName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Applied for: {job.title}
              </p>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {application.email}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {application.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Applied:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Experience:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {application.experience} years
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Skills
              </h2>
            </div>
            <div className="px-4 py-3">
              <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h2 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <DocumentTextIcon className="mr-1 h-5 w-5" />
                Resume
              </h2>
            </div>
            <div className="px-4 py-3">
              <Button variant="outline" className="w-full text-sm">
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <DocumentTextIcon className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Actions
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-sm">
                  Send Email
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  Schedule Interview
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                >
                  Reject Application
                </Button>
              </div>
            </div>
          </div>

          {application.coverLetter && (
            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cover Letter
                </h2>
              </div>
              <div className="px-4 py-3">
                <div className="rounded-md border border-gray-200 p-3 dark:border-gray-700">
                  <p className="whitespace-pre-line text-sm text-gray-900 dark:text-white">
                    {application.coverLetter}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Notes
              </h2>
            </div>
            <div className="px-4 py-3">
              <textarea
                id="notes-mobile"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Add private notes about this application..."
              ></textarea>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-3 text-sm"
              >
                {isSaving ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-6 md:col-span-2">
            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 dark:border-gray-700 dark:bg-gray-700">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Applicant Information
                </h2>
              </div>
              <div className="px-4 sm:px-6 py-3 sm:py-4">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 dark:text-white">
                      {application.fullName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 dark:text-white">
                      {application.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 dark:text-white">
                      {application.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Applied On
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 dark:text-white">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Experience
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 dark:text-white">
                      {application.experience} years
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Match Score
                    </h3>
                    <div className="mt-1 flex items-center">
                      {application.matchScore ? (
                        <>
                          <div className="mr-2 h-2 w-20 sm:w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-primary-500"
                              style={{ width: `${application.matchScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm sm:text-base text-gray-900 dark:text-white">
                            {application.matchScore}%
                          </span>
                        </>
                      ) : (
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white">
                          Not analyzed yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Skills
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
                    {application.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {application.coverLetter && (
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Cover Letter
                    </h3>
                    <div className="mt-1 rounded-md border border-gray-200 p-3 sm:p-4 dark:border-gray-700">
                      <p className="whitespace-pre-line text-sm sm:text-base text-gray-900 dark:text-white">
                        {application.coverLetter}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 sm:mt-6">
                  <h3 className="flex items-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <DocumentTextIcon className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                    Resume
                  </h3>
                  <div className="mt-1">
                    <Button variant="outline" className="text-sm sm:text-base">
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <DocumentTextIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        View Resume
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 dark:border-gray-700 dark:bg-gray-700">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Job Details
                </h2>
              </div>
              <div className="px-4 sm:px-6 py-3 sm:py-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  {job.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {job.category} • {job.location}
                </p>
                <div className="mt-3 sm:mt-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
                <div className="mt-3 sm:mt-4">
                  <Link to={`/dashboard/jobs/${job.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      View Full Job Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 dark:border-gray-700 dark:bg-gray-700">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Application Status
                </h2>
              </div>
              <div className="px-4 sm:px-6 py-3 sm:py-4">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value as ApplicationStatus)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Admin Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={5}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Add private notes about this application..."
                    ></textarea>
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full text-sm sm:text-base"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 dark:border-gray-700 dark:bg-gray-700">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Actions
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                  >
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                  >
                    Schedule Interview
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                  >
                    Reject Application
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
