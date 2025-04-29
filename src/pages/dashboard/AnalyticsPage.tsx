import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

export function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">Analytics</h1>
          <p className="text-sm sm:text-base mt-1 sm:mt-2">
            View analytics and statistics about your hiring process.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Applications per Month
            </h2>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Chart Placeholder
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Hiring Funnel
            </h2>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Chart Placeholder
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Time to Hire
            </h2>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Chart Placeholder
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 sm:p-5 md:p-6 shadow dark:bg-gray-800">
            <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Source of Applicants
            </h2>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Chart Placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
