import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

export function ApplicantsManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">
            Applicants Management
          </h1>
          <p className="text-sm sm:text-base mt-1 sm:mt-2">
            View and manage all applicants for your job openings.
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            All Applicants
          </h2>

          <div className="sm:hidden space-y-4">
            <div className="border rounded-md p-3 dark:border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">John Doe</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-100">
                  In Review
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Position:
                  </span>
                  <span>Software Engineer</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Applied:
                  </span>
                  <span>2023-04-15</span>
                </p>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <button className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md dark:bg-blue-900 dark:text-blue-100">
                  View
                </button>
                <button className="text-sm px-3 py-1 bg-green-50 text-green-600 rounded-md dark:bg-green-900 dark:text-green-100">
                  Interview
                </button>
              </div>
            </div>

            <div className="border rounded-md p-3 dark:border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Jane Smith</h3>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-100">
                  Interviewed
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Position:
                  </span>
                  <span>Product Manager</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Applied:
                  </span>
                  <span>2023-04-10</span>
                </p>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <button className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md dark:bg-blue-900 dark:text-blue-100">
                  View
                </button>
                <button className="text-sm px-3 py-1 bg-green-50 text-green-600 rounded-md dark:bg-green-900 dark:text-green-100">
                  Hire
                </button>
              </div>
            </div>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-3 py-2 sm:px-4 text-left text-xs sm:text-sm">
                    Name
                  </th>
                  <th className="px-3 py-2 sm:px-4 text-left text-xs sm:text-sm">
                    Position
                  </th>
                  <th className="px-3 py-2 sm:px-4 text-left text-xs sm:text-sm">
                    Applied Date
                  </th>
                  <th className="px-3 py-2 sm:px-4 text-left text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="px-3 py-2 sm:px-4 text-left text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    John Doe
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    Software Engineer
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    2023-04-15
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-100">
                      In Review
                    </span>
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:hover:text-green-400">
                      Interview
                    </button>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    Jane Smith
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    Product Manager
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    2023-04-10
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-100">
                      Interviewed
                    </span>
                  </td>
                  <td className="px-3 py-2 sm:px-4 text-xs sm:text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:hover:text-green-400">
                      Hire
                    </button>
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
