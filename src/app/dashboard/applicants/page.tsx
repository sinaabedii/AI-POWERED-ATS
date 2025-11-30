import { getApplications } from '@/lib/data';
import { getStatusBadgeClass } from '@/lib/utils';

export default function ApplicantsManagementPage() {
  const applications = getApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applicants Management</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage all applicants for your job openings.
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">All Applicants</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300">
                  Applied Date
                </th>
                <th className="px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{app.fullName}</td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{app.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(app.status)}`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:hover:text-green-400">
                      Interview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
