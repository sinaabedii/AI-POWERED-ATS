import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export function ApplicantsManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Applicants Management</h1>
        <p>View and manage all applicants for your job openings.</p>
        
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium">All Applicants</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Position</th>
                  <th className="px-4 py-2 text-left">Applied Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">Software Engineer</td>
                  <td className="px-4 py-2">2023-04-15</td>
                  <td className="px-4 py-2">In Review</td>
                  <td className="px-4 py-2">
                    <button className="mr-2 text-blue-600">View</button>
                    <button className="text-green-600">Interview</button>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">Product Manager</td>
                  <td className="px-4 py-2">2023-04-10</td>
                  <td className="px-4 py-2">Interviewed</td>
                  <td className="px-4 py-2">
                    <button className="mr-2 text-blue-600">View</button>
                    <button className="text-green-600">Hire</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}