export type ApplicationStatus = 
  | 'pending'
  | 'screening'
  | 'interview'
  | 'technical'
  | 'offer'
  | 'hired'
  | 'rejected';

export interface Applicant {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  resumeUrl: string;
  photoUrl?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedDate: string;
  skills: string[];
  experience: number;
  matchScore?: number;
}