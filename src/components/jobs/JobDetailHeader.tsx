import { Job } from '../../types/job';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MapPinIcon, CalendarIcon, ShareIcon } from '@heroicons/react/24/outline';

interface JobDetailHeaderProps {
  job: Job;
}

export function JobDetailHeader({ job }: JobDetailHeaderProps) {
  const postedDate = new Date(job.postedDate);
  const now = new Date();
  const differenceInTime = now.getTime() - postedDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
  const daysAgo = differenceInDays === 0 
    ? 'Today' 
    : differenceInDays === 1 
      ? 'Yesterday' 
      : `${differenceInDays} days ago`;

  return (
    <div className="relative overflow-hidden bg-gray-900 py-16">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
      </div>
      
      <div className="relative container-custom">
        <div className="md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <Badge variant="default" className="mb-4">
              {job.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {job.title}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-gray-300 md:justify-start">
              <div className="flex items-center">
                <MapPinIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center">
                <CalendarIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                <span>Posted {daysAgo}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-4 md:mt-0 md:flex-row">
            <Button variant="default">Apply for this Job</Button>
            <Button variant="outline" className="dark:border-gray-600 dark:text-white">
              <ShareIcon className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}