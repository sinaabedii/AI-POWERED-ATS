import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p>View analytics and statistics about your hiring process.</p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium">Applications per Month</h2>
            <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium">Hiring Funnel</h2>
            <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium">Time to Hire</h2>
            <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium">Source of Applicants</h2>
            <div className="h-64 bg-gray-100 flex items-center justify-center dark:bg-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}