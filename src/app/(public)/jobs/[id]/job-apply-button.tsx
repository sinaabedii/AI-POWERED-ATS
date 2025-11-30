'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface JobApplyButtonProps {
  jobId: string;
  fullWidth?: boolean;
}

export function JobApplyButton({ jobId, fullWidth }: JobApplyButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleApply = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/jobs/${jobId}`);
      return;
    }
    // In a real app, this would open an application form or redirect to apply page
    alert('Application form would open here. This is a demo.');
  };

  return (
    <Button size="lg" onClick={handleApply} className={fullWidth ? 'w-full' : ''}>
      <ClipboardDocumentCheckIcon className="mr-2 h-5 w-5" />
      Apply Now
    </Button>
  );
}
