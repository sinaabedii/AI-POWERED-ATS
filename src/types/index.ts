// User & Auth Types
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Job Types
export type JobCategory =
  | 'All'
  | 'Finance'
  | 'Tech'
  | 'Product'
  | 'Commercial'
  | 'Business Development'
  | 'Marketing'
  | 'Operations';

export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  description: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  about: string;
  isActive: boolean;
  createdBy: string;
}

// Application Types
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

// Company Types
export interface Benefit {
  id: string;
  title: string;
  icon: string;
}

export interface Company {
  name: string;
  description: string;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  benefits: Benefit[];
  photos: string[];
}
