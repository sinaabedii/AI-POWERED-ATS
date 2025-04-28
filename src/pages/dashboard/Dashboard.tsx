import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your ATS dashboard. Here you can manage your recruitment process.</p>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-lg font-medium">Total Applications</h2>
            <p className="mt-2 text-3xl font-bold">125</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-lg font-medium">Open Positions</h2>
            <p className="mt-2 text-3xl font-bold">12</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-lg font-medium">Interviews Scheduled</h2>
            <p className="mt-2 text-3xl font-bold">8</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}