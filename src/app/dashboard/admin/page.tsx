'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, StatCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminOverview, useAdminUsers, useAdminJobs, useAdminApplications } from '@/hooks/useAdmin';
import {
  UserGroupIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

type Tab = 'overview' | 'users' | 'jobs' | 'applications';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const { overview, isLoading: overviewLoading } = useAdminOverview();
  const { users, isLoading: usersLoading, deleteUser, activateUser, deactivateUser, changeRole, verifyUser } = useAdminUsers();
  const { jobs, isLoading: jobsLoading, deleteJob } = useAdminJobs();
  const { applications, isLoading: appsLoading, updateStatus } = useAdminApplications();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'users', label: 'Users', icon: UserGroupIcon },
    { id: 'jobs', label: 'Jobs', icon: BriefcaseIcon },
    { id: 'applications', label: 'Applications', icon: DocumentTextIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage users, jobs, and applications
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {overviewLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : overview && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={overview.users.total}
                  icon={<UserGroupIcon className="h-6 w-6" />}
                  color="violet"
                  trend={{ value: overview.users.new_this_month, label: 'new this month' }}
                />
                <StatCard
                  title="Active Jobs"
                  value={overview.jobs.active}
                  icon={<BriefcaseIcon className="h-6 w-6" />}
                  color="cyan"
                  trend={{ value: overview.jobs.new_this_month, label: 'new this month' }}
                />
                <StatCard
                  title="Applications"
                  value={overview.applications.total}
                  icon={<DocumentTextIcon className="h-6 w-6" />}
                  color="amber"
                  trend={{ value: overview.applications.new_this_month, label: 'new this month' }}
                />
                <StatCard
                  title="Total Hires"
                  value={overview.hiring.total_hires}
                  icon={<CheckCircleIcon className="h-6 w-6" />}
                  color="emerald"
                  trend={{ value: overview.hiring.hires_this_month, label: 'this month' }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Candidates</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{overview.users.candidates}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Recruiters</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{overview.users.recruiters}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Pending Applications</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{overview.applications.pending}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Interviews Scheduled</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{overview.hiring.interviews_scheduled}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Offers Made</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{overview.hiring.offers_made}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Users Management</CardTitle>
            <Button size="sm" leftIcon={<PlusIcon className="h-4 w-4" />}>
              Add User
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {usersLoading ? (
              <div className="p-6">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-medium">
                              {user.first_name?.[0]}{user.last_name?.[0]}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">{user.full_name}</p>
                              <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={(e) => changeRole(user.id, e.target.value)}
                            className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded text-sm"
                          >
                            <option value="candidate">Candidate</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="hr">HR</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {user.is_active ? (
                              <Badge variant="success" size="sm">Active</Badge>
                            ) : (
                              <Badge variant="danger" size="sm">Inactive</Badge>
                            )}
                            {user.is_verified ? (
                              <Badge variant="info" size="sm">Verified</Badge>
                            ) : (
                              <button 
                                onClick={() => verifyUser(user.id)}
                                className="text-xs text-violet-600 hover:underline"
                              >
                                Verify
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => user.is_active ? deactivateUser(user.id) : activateUser(user.id)}>
                              {user.is_active ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteUser(user.id)}>
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Jobs Management</CardTitle>
            <Button size="sm" leftIcon={<PlusIcon className="h-4 w-4" />}>
              Create Job
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {jobsLoading ? (
              <div className="p-6">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Job</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Applications</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900 dark:text-white">{job.title}</p>
                          <p className="text-sm text-slate-500">{job.company_name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" size="sm">{job.category_name}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {job.is_active ? (
                            <Badge variant="success" size="sm">Active</Badge>
                          ) : (
                            <Badge variant="danger" size="sm">Inactive</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {job.applications_count}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteJob(job.id)}>
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <Card>
          <CardHeader>
            <CardTitle>Applications Management</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {appsLoading ? (
              <div className="p-6">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Job</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Match</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Applied</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900 dark:text-white">{app.applicant_name}</p>
                          <p className="text-sm text-slate-500">{app.applicant_email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {app.job_title}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => updateStatus(app.id, e.target.value)}
                            className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview">Interview</option>
                            <option value="offered">Offered</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          {app.match_score ? (
                            <span className={`font-medium ${app.match_score >= 80 ? 'text-emerald-600' : app.match_score >= 60 ? 'text-amber-600' : 'text-slate-500'}`}>
                              {app.match_score}%
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(app.applied_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
