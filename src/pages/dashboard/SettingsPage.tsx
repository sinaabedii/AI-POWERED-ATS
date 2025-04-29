import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

export function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
          <p className="text-sm sm:text-base mt-1 sm:mt-2">
            Manage your account and application settings.
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 sm:p-6 shadow dark:bg-gray-800">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Profile Settings
          </h2>
          <form className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 text-sm"
                defaultValue="Admin User"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 text-sm"
                defaultValue="admin@example.com"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center sm:justify-start items-center px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-lg bg-white p-4 sm:p-6 shadow dark:bg-gray-800">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Notification Settings
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0 sm:pr-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Receive email notifications for new applications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700">
              <div className="mb-2 sm:mb-0 sm:pr-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  Browser Notifications
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Receive browser notifications for new applications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="mb-2 sm:mb-0 sm:pr-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  SMS Notifications
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Receive text messages for urgent notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 sm:p-6 shadow dark:bg-gray-800">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Advanced Settings
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Zone
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 text-sm">
                <option>UTC (GMT+0)</option>
                <option>Eastern Time (GMT-5)</option>
                <option>Central Time (GMT-6)</option>
                <option>Mountain Time (GMT-7)</option>
                <option>Pacific Time (GMT-8)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
