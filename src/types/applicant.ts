export type ApplicationStatus = 
  | 'pending'
  | 'reviewed'
  | 'shortlisted'
  | 'interview'
  | 'offered'
  | 'rejected'
  | 'hired';

export interface Application {
  id: string;
  jobId: string;
  userId: string; 
  fullName: string;
  email: string;
  phoneNumber: string;
  resumeUrl: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedDate: string;
  skills: string[];
  experience: number;
  matchScore?: number; 
  notes?: string; 
  photoUrl?: string;
}