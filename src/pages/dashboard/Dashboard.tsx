import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

export function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <p className="text-sm sm:text-base mt-1 sm:mt-2">
            Welcome to your ATS dashboard. Here you can manage your recruitment
            process.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base sm:text-lg font-medium">
                Total Applications
              </h2>
              <p className="mt-1 sm:mt-0 text-2xl sm:text-3xl font-bold">125</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base sm:text-lg font-medium">
                Open Positions
              </h2>
              <p className="mt-1 sm:mt-0 text-2xl sm:text-3xl font-bold">12</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base sm:text-lg font-medium">
                Interviews Scheduled
              </h2>
              <p className="mt-1 sm:mt-0 text-2xl sm:text-3xl font-bold">8</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
          <h2 className="text-base sm:text-lg font-medium mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-4">
            <button className="flex flex-col items-center justify-center rounded-md bg-gray-50 p-3 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-xs sm:text-sm">Add Job</span>
            </button>

            <button className="flex flex-col items-center justify-center rounded-md bg-gray-50 p-3 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <span className="text-xs sm:text-sm">Applications</span>
            </button>

            <button className="flex flex-col items-center justify-center rounded-md bg-gray-50 p-3 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs sm:text-sm">Interviews</span>
            </button>

            <button className="flex flex-col items-center justify-center rounded-md bg-gray-50 p-3 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-xs sm:text-sm">Analytics</span>
            </button>
          </div>
        </div>

        <div className="hidden sm:block rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
          <h2 className="text-base sm:text-lg font-medium mb-3">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <span className="font-medium">Sarah Johnson</span> applied for{" "}
                  <span className="font-medium">Senior Developer</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <span className="font-medium">Mike Chen</span> was hired for{" "}
                  <span className="font-medium">UX Designer</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Yesterday
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 dark:bg-purple-900 dark:text-purple-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <span className="font-medium">Interview scheduled</span> with
                  Daniel Brown for{" "}
                  <span className="font-medium">Product Manager</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 days ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
