import { Job } from '../../types/job';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Job Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">{job.summary}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About Company</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">{job.about}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}