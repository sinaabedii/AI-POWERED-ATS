import { Link } from 'react-router-dom';
import { Card, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Job } from '../../types/job';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
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
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {job.title}
            </h3>
            <Badge variant="default">{job.category}</Badge>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
            {job.location}
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
            Posted {daysAgo}
          </div>
          
          <p className="mt-4 text-sm text-gray-600 line-clamp-3 dark:text-gray-300">
            {job.description}
          </p>
        </div>
        
        <div className="mt-6">
          <Link to={`/jobs/${job.id}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}