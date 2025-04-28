import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export function JobsManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Jobs Management</h1>
        <p>Manage all job postings and openings.</p>
        
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium">All Jobs</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-2">Software Engineer</td>
                  <td className="px-4 py-2">Engineering</td>
                  <td className="px-4 py-2">Remote</td>
                  <td className="px-4 py-2">Active</td>
                  <td className="px-4 py-2">
                    <button className="mr-2 text-blue-600">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-2">Product Manager</td>
                  <td className="px-4 py-2">Product</td>
                  <td className="px-4 py-2">New York</td>
                  <td className="px-4 py-2">Active</td>
                  <td className="px-4 py-2">
                    <button className="mr-2 text-blue-600">Edit</button>
                    <button className="text-red-600">Delete</button>
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