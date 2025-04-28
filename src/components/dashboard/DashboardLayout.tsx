import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { ThemeToggle } from "../common/ThemeToggle";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Jobs", href: "/dashboard/jobs", icon: BriefcaseIcon },
    { name: "Applicants", href: "/dashboard/applicants", icon: UserGroupIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          sidebarOpen ? "visible" : "invisible"
        }`}
        aria-hidden="true"
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen
              ? "opacity-100 ease-out duration-300"
              : "opacity-0 ease-in duration-200"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          className={`relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 dark:bg-gray-800 ${
            sidebarOpen
              ? "translate-x-0 ease-out duration-300"
              : "-translate-x-full ease-in duration-200"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-shrink-0 items-center px-4">
            <Link
              to="/"
              className="text-xl font-bold text-primary-600 dark:text-primary-500"
            >
              ATS System
            </Link>
          </div>
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    isActive(item.href)
                      ? "bg-gray-100 text-primary-600 dark:bg-gray-900 dark:text-primary-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={clsx(
                      isActive(item.href)
                        ? "text-primary-600 dark:text-primary-500"
                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300",
                      "mr-4 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
      </div>

      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Link
                to="/"
                className="text-xl font-bold text-primary-600 dark:text-primary-500"
              >
                ATS System
              </Link>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    isActive(item.href)
                      ? "bg-gray-100 text-primary-600 dark:bg-gray-900 dark:text-primary-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={clsx(
                      isActive(item.href)
                        ? "text-primary-600 dark:text-primary-500"
                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-white p-2 dark:bg-gray-800 sm:p-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-400 dark:hover:text-gray-50"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <header className="bg-white shadow dark:bg-gray-800">
          <div className="flex h-16 items-center justify-end px-4 sm:px-6 md:px-8">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
