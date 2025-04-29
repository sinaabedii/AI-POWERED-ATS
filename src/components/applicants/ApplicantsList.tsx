import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import { Badge } from "../common/Badge";
import {
  getApplications,
  getApplicationsByJobId,
} from "../../services/mockData";
import { Avatar } from "../common/Avatar";
import { Application, ApplicationStatus } from "../../types/applicant";

interface ApplicantsListProps {
  jobId?: string;
}

export function ApplicantsList({ jobId }: ApplicantsListProps) {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setIsLoading(true);
        const data = jobId
          ? await getApplicationsByJobId(jobId)
          : await getApplications();
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const getStatusBadgeVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "reviewed":
        return "info";
      case "interview":
        return "warning";
      case "shortlisted":
        return "warning";
      case "offered":
        return "success";
      case "hired":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Loading applicants...
          </p>
        </div>
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-center text-gray-500 dark:text-gray-400">
            No applicants found.
            {jobId
              ? " This job has no applications yet."
              : " Add a job to receive applications."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applicants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Match</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <Avatar
                        size="sm"
                        src={applicant.photoUrl}
                        fallback={applicant.fullName.substring(0, 2)}
                        alt={applicant.fullName}
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {applicant.fullName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {applicant.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {applicant.jobId === "1"
                      ? "General Accountant"
                      : applicant.jobId === "2"
                      ? "Software Engineer (Golang)"
                      : applicant.jobId === "3"
                      ? "Junior User Researcher"
                      : applicant.jobId === "4"
                      ? "Support Engineer"
                      : "Unknown Position"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(applicant.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={getStatusBadgeVariant(applicant.status)}>
                      {applicant.status.charAt(0).toUpperCase() +
                        applicant.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {applicant.matchScore || 0}%
                      </span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full bg-primary-500"
                          style={{ width: `${applicant.matchScore || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
