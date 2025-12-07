/**
 * Application constants
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Job Types
export const JOB_TYPES = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
] as const;

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'lead', label: 'Lead/Manager' },
  { value: 'executive', label: 'Executive' },
] as const;

// Application Statuses
export const APPLICATION_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'secondary' },
  { value: 'reviewed', label: 'Reviewed', color: 'info' },
  { value: 'shortlisted', label: 'Shortlisted', color: 'default' },
  { value: 'interview', label: 'Interview', color: 'warning' },
  { value: 'offered', label: 'Offered', color: 'success' },
  { value: 'hired', label: 'Hired', color: 'gradient' },
  { value: 'rejected', label: 'Rejected', color: 'danger' },
  { value: 'withdrawn', label: 'Withdrawn', color: 'secondary' },
] as const;

// User Roles
export const USER_ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'hr', label: 'HR Manager' },
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'candidate', label: 'Candidate' },
] as const;

// Interview Types
export const INTERVIEW_TYPES = [
  { value: 'phone', label: 'Phone Screen' },
  { value: 'video', label: 'Video Call' },
  { value: 'onsite', label: 'On-site' },
  { value: 'technical', label: 'Technical' },
  { value: 'final', label: 'Final Round' },
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// OTP Configuration
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 5;

// Token Configuration
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user';

// Interview Statuses
export const INTERVIEW_STATUSES = [
  { value: 'scheduled', label: 'Scheduled', color: 'info' },
  { value: 'completed', label: 'Completed', color: 'success' },
  { value: 'cancelled', label: 'Cancelled', color: 'danger' },
  { value: 'rescheduled', label: 'Rescheduled', color: 'warning' },
  { value: 'no_show', label: 'No Show', color: 'secondary' },
] as const;

// Routes
export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  DASHBOARD_USER: '/dashboard/user',
  DASHBOARD_JOBS: '/dashboard/jobs',
  DASHBOARD_APPLICANTS: '/dashboard/applicants',
  DASHBOARD_INTERVIEWS: '/dashboard/interviews',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_ADMIN: '/dashboard/admin',
  DASHBOARD_SETTINGS: '/dashboard/settings',
} as const;

// Role-based Dashboard Routes
export const ROLE_DASHBOARD_ROUTES: Record<string, string> = {
  admin: ROUTES.DASHBOARD_ADMIN,
  hr: ROUTES.DASHBOARD_JOBS,
  recruiter: ROUTES.DASHBOARD_JOBS,
  candidate: ROUTES.DASHBOARD_USER,
};
