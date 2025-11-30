export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View analytics and statistics about your hiring process.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Applications per Month
          </h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Hiring Funnel</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Time to Hire</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Source of Applicants
          </h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
