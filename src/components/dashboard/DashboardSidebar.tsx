import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Jobs', href: '/dashboard/jobs', icon: BriefcaseIcon },
    { name: 'Applicants', href: '/dashboard/applicants', icon: UserGroupIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white transition duration-300 ease-in-out dark:bg-gray-800 md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-500">
            TechRide ATS
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:hover:bg-gray-700 md:hidden"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 h-0 flex-1 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-600 dark:bg-gray-900 dark:text-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                )}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive(item.href)
                      ? 'text-primary-500 dark:text-primary-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}