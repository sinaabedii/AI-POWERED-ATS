/**
 * Type definitions for ATS Frontend
 * Aligned with backend API responses
 */

// =============================================================================
// User & Auth Types
// =============================================================================

export type UserRole = 'admin' | 'hr' | 'recruiter' | 'candidate';

export interface User {
  id: number;
  phone: string;
  email: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  role: UserRole;
  title: string;
  company: string;
  bio: string;
  location: string;
  linkedin_url: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  last_login_at?: string;
  skills?: UserSkill[];
  experiences?: UserExperience[];
}

export interface UserSkill {
  id: number;
  name: string;
  level: 1 | 2 | 3 | 4;
  level_display?: string;
}

export interface UserExperience {
  id: number;
  company: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  duration?: string;
}

export interface TokenResponse {
  tokens: {
    access: string;
    refresh: string;
    access_expires_in: number;
    refresh_expires_in: number;
    token_type: string;
  };
  user: User;
}

// =============================================================================
// Job Types
// =============================================================================

export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  jobs_count?: number;
  active_jobs_count?: number;
}

export interface JobBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Job {
  id: number;
  title: string;
  slug: string;
  category: Category | null;
  category_name?: string;
  description: string;
  summary: string;
  requirements: string[];
  responsibilities: string[];
  skills_required: string[];
  job_type: JobType;
  experience_level: ExperienceLevel;
  location: string;
  is_remote: boolean;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  show_salary: boolean;
  salary_range: string | null;
  company_name: string;
  company_logo: string | null;
  about_company: string;
  is_active: boolean;
  is_featured: boolean;
  views_count: number;
  posted_date: string;
  deadline: string | null;
  updated_at?: string;
  applications_count: number;
  is_saved?: boolean;
  has_applied?: boolean;
  benefits?: JobBenefit[];
  created_by?: User;
  created_by_name?: string;
}

export interface SavedJob {
  id: number;
  job: Job;
  saved_at: string;
}

// =============================================================================
// Application Types
// =============================================================================

export type ApplicationStatus = 
  | 'pending' 
  | 'reviewed' 
  | 'shortlisted' 
  | 'interview' 
  | 'offered' 
  | 'hired' 
  | 'rejected' 
  | 'withdrawn';

export interface ApplicationStatusHistory {
  id: number;
  old_status: ApplicationStatus;
  old_status_display: string;
  new_status: ApplicationStatus;
  new_status_display: string;
  changed_by_name: string;
  notes: string;
  changed_at: string;
}

export interface Application {
  id: number;
  job: number | Job;
  job_title?: string;
  job_company?: string;
  user?: User;
  applicant_name?: string;
  applicant_email?: string;
  cover_letter: string;
  resume: string | null;
  portfolio_url: string;
  linkedin_url: string;
  status: ApplicationStatus;
  status_display?: string;
  match_score: number | null;
  ai_analysis?: Record<string, unknown>;
  internal_notes?: string;
  applied_date: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by_name?: string;
  status_history?: ApplicationStatusHistory[];
  interviews?: Interview[];
  can_withdraw?: boolean;
}

// =============================================================================
// Interview Types
// =============================================================================

export type InterviewType = 'phone' | 'video' | 'onsite' | 'technical' | 'final';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';

export interface Interview {
  id: number;
  interview_type: InterviewType;
  interview_type_display?: string;
  status: InterviewStatus;
  status_display?: string;
  scheduled_at: string;
  duration_minutes: number;
  location: string;
  meeting_link: string;
  interviewers: number[];
  interviewers_data?: User[];
  feedback: string;
  rating: number | null;
  is_upcoming?: boolean;
  created_at: string;
}

// =============================================================================
// Analytics Types
// =============================================================================

export interface DashboardStats {
  total_applications: number;
  pending_applications: number;
  interviews_scheduled: number;
  offers_made: number;
  total_jobs: number;
  active_jobs: number;
  total_users: number;
  total_hires: number;
}

export interface HiringFunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface ApplicationTrend {
  date: string;
  count: number;
}

export interface TopJob {
  id: number;
  title: string;
  applications_count: number;
  views_count: number;
}

export interface CategoryStats {
  id: number;
  name: string;
  jobs_count: number;
  applications_count: number;
}

export interface ApplicationsByJob {
  job_id: number;
  job_title: string;
  count: number;
}

export interface DailyStats {
  id: number;
  date: string;
  new_users: number;
  new_jobs: number;
  new_applications: number;
  interviews_scheduled: number;
  offers_made: number;
  hires: number;
}

export interface AdminOverview {
  users: {
    total: number;
    candidates: number;
    recruiters: number;
    new_this_month: number;
  };
  jobs: {
    total: number;
    active: number;
    new_this_month: number;
  };
  applications: {
    total: number;
    pending: number;
    new_this_month: number;
  };
  hiring: {
    interviews_scheduled: number;
    offers_made: number;
    total_hires: number;
    hires_this_month: number;
  };
}

// =============================================================================
// API Response Types
// =============================================================================

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiErrorResponse {
  detail?: string;
  error?: string;
  [key: string]: string | string[] | undefined;
}

// =============================================================================
// Form Types
// =============================================================================

export interface RegisterFormData {
  phone: string;
  first_name: string;
  last_name: string;
  email?: string;
  password: string;
  password_confirm: string;
  otp_code: string;
}

export interface LoginFormData {
  phone: string;
  password: string;
}

export interface ResetPasswordFormData {
  phone: string;
  otp_code: string;
  new_password: string;
  new_password_confirm: string;
}

export interface JobFormData {
  title: string;
  category: number | null;
  description: string;
  summary: string;
  requirements: string[];
  responsibilities: string[];
  skills_required: string[];
  job_type: JobType;
  experience_level: ExperienceLevel;
  location: string;
  is_remote: boolean;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  show_salary: boolean;
  company_name: string;
  about_company: string;
  is_active: boolean;
  is_featured: boolean;
  deadline?: string;
}

export interface ApplicationFormData {
  job: number;
  cover_letter?: string;
  portfolio_url?: string;
  linkedin_url?: string;
}

// =============================================================================
// Utility Types
// =============================================================================

export type SortOrder = 'asc' | 'desc';

export interface FilterParams {
  search?: string;
  category?: number;
  job_type?: JobType;
  experience_level?: ExperienceLevel;
  is_remote?: boolean;
  salary_min?: number;
  salary_max?: number;
  status?: ApplicationStatus;
  page?: number;
  ordering?: string;
}
