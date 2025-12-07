'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    // Redirect based on user role
    switch (user.role) {
      case 'admin':
        router.replace('/dashboard/admin');
        break;
      case 'hr':
      case 'recruiter':
        router.replace('/dashboard/jobs');
        break;
      case 'candidate':
      default:
        router.replace('/dashboard/user');
        break;
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 dark:text-slate-400">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
