/**
 * API Service for AryanTalent Backend
 * Handles all HTTP requests with JWT authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface TokenResponse {
  tokens: {
    access: string;
    refresh: string;
    access_expires_in: number;
    refresh_expires_in: number;
    token_type: string;
  };
  user: User;
}

interface User {
  id: number;
  phone: string;
  email: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  role: 'admin' | 'hr' | 'recruiter' | 'candidate';
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
}

class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
    }
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && this.refreshToken) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
        const retryResponse = await fetch(url, { ...options, headers });
        if (!retryResponse.ok) {
          throw new ApiError(retryResponse.status, await retryResponse.json().catch(() => ({})));
        }
        return retryResponse.json();
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData);
    }

    if (response.status === 204) return {} as T;
    return response.json();
  }

  private async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.access;
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', data.access);
        }
        return true;
      }
      this.clearTokens();
      return false;
    } catch {
      this.clearTokens();
      return false;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Auth Endpoints
  async sendOTP(phone: string, purpose: 'register' | 'login' | 'reset_password' = 'register') {
    return this.post<{ message: string; phone: string; code: string; expires_in: number }>(
      '/auth/send-otp/',
      { phone, purpose }
    );
  }

  async verifyOTP(phone: string, code: string, purpose: 'register' | 'login' | 'reset_password' = 'register') {
    return this.post<{ message: string; valid: boolean }>(
      '/auth/verify-otp/',
      { phone, code, purpose }
    );
  }

  async register(data: {
    phone: string;
    first_name: string;
    last_name: string;
    email?: string;
    password: string;
    password_confirm: string;
    otp_code: string;
  }): Promise<TokenResponse> {
    const response = await this.post<TokenResponse>('/auth/register/', data);
    this.setTokens(response.tokens.access, response.tokens.refresh);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  async login(phone: string, password: string): Promise<TokenResponse> {
    const response = await this.post<TokenResponse>('/auth/login/', { phone, password });
    this.setTokens(response.tokens.access, response.tokens.refresh);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  async loginWithOTP(phone: string, otp_code: string): Promise<TokenResponse> {
    const response = await this.post<TokenResponse>('/auth/login/otp/', { phone, otp_code });
    this.setTokens(response.tokens.access, response.tokens.refresh);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  }

  async resetPassword(phone: string, otp_code: string, new_password: string, new_password_confirm: string) {
    return this.post<{ message: string }>('/auth/reset-password/', {
      phone, otp_code, new_password, new_password_confirm
    });
  }

  async logout() {
    try {
      if (this.refreshToken) {
        await this.post('/auth/logout/', { refresh: this.refreshToken });
      }
    } finally {
      this.clearTokens();
    }
  }

  async getProfile(): Promise<User> {
    return this.get<User>('/auth/profile/');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.put<User>('/auth/profile/', data);
  }

  async changePassword(oldPassword: string, newPassword: string) {
    return this.put('/auth/change-password/', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  }

  // Jobs Endpoints
  async getJobs(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<Job>>(`/jobs/list/${query}`);
  }

  async getJob(slug: string) {
    return this.get<Job>(`/jobs/list/${slug}/`);
  }

  async getFeaturedJobs() {
    return this.get<Job[]>('/jobs/list/featured/');
  }

  async getCategories() {
    return this.get<Category[]>('/jobs/categories/');
  }

  async saveJob(jobId: number) {
    return this.post('/jobs/saved/', { job_id: jobId });
  }

  async unsaveJob(jobId: number) {
    return this.delete(`/jobs/saved/job/${jobId}/`);
  }

  async getSavedJobs() {
    return this.get<PaginatedResponse<SavedJob>>('/jobs/saved/');
  }

  // Applications Endpoints
  async getMyApplications() {
    return this.get<PaginatedResponse<Application>>('/applications/my/');
  }

  async applyToJob(data: { job: number; cover_letter?: string; portfolio_url?: string; linkedin_url?: string }) {
    return this.post<Application>('/applications/my/', data);
  }

  async withdrawApplication(id: number) {
    return this.delete(`/applications/my/${id}/`);
  }

  // Analytics Endpoints
  async getDashboardStats() {
    return this.get<DashboardStats>('/analytics/dashboard/');
  }

  async getApplicationsByStatus() {
    return this.get<{ status: string; count: number }[]>('/analytics/applications/by-status/');
  }

  async getHiringFunnel() {
    return this.get<{ stage: string; count: number; percentage: number }[]>('/analytics/hiring-funnel/');
  }

  async getApplicationsTrend(days: number = 30) {
    return this.get<{ date: string; count: number }[]>(`/analytics/applications/trend/?days=${days}`);
  }

  async getTopJobs() {
    return this.get<{ id: number; title: string; applications_count: number; views_count: number }[]>('/analytics/top-jobs/');
  }

  // Admin Endpoints
  async adminGetUsers(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<User>>(`/auth/admin/users/${query}`);
  }

  async adminCreateUser(data: Partial<User> & { password: string }) {
    return this.post<User>('/auth/admin/users/', data);
  }

  async adminUpdateUser(id: number, data: Partial<User>) {
    return this.patch<User>(`/auth/admin/users/${id}/`, data);
  }

  async adminDeleteUser(id: number) {
    return this.delete(`/auth/admin/users/${id}/`);
  }

  async adminActivateUser(id: number) {
    return this.post(`/auth/admin/users/${id}/activate/`);
  }

  async adminDeactivateUser(id: number) {
    return this.post(`/auth/admin/users/${id}/deactivate/`);
  }

  async adminChangeUserRole(id: number, role: string) {
    return this.post(`/auth/admin/users/${id}/change_role/`, { role });
  }

  async adminGetJobs(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<Job>>(`/jobs/admin/jobs/${query}`);
  }

  async adminCreateJob(data: Partial<Job>) {
    return this.post<Job>('/jobs/admin/jobs/', data);
  }

  async adminUpdateJob(id: number, data: Partial<Job>) {
    return this.patch<Job>(`/jobs/admin/jobs/${id}/`, data);
  }

  async adminDeleteJob(id: number) {
    return this.delete(`/jobs/admin/jobs/${id}/`);
  }

  async adminGetCategories() {
    return this.get<PaginatedResponse<Category>>('/jobs/admin/categories/');
  }

  async adminCreateCategory(data: Partial<Category>) {
    return this.post<Category>('/jobs/admin/categories/', data);
  }

  async adminUpdateCategory(id: number, data: Partial<Category>) {
    return this.patch<Category>(`/jobs/admin/categories/${id}/`, data);
  }

  async adminDeleteCategory(id: number) {
    return this.delete(`/jobs/admin/categories/${id}/`);
  }

  async adminGetApplications(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<Application>>(`/applications/admin/applications/${query}`);
  }

  async adminUpdateApplicationStatus(id: number, status: string, notes?: string) {
    return this.post(`/applications/manage/${id}/update_status/`, { status, notes });
  }

  async adminGetOverview() {
    return this.get<AdminOverview>('/analytics/admin/overview/');
  }

  // Missing Analytics Endpoints
  async getApplicationsByJob() {
    return this.get<{ job_id: number; job_title: string; count: number }[]>('/analytics/applications/by-job/');
  }

  async getCategoryStats() {
    return this.get<{ id: number; name: string; jobs_count: number; applications_count: number }[]>('/analytics/categories/');
  }

  async getAdminDailyStats(days: number = 30) {
    return this.get<DailyStats[]>(`/analytics/admin/daily-stats/?days=${days}`);
  }

  // Application Management Endpoints (for Recruiters)
  async getApplicationsManage(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<Application>>(`/applications/manage/${query}`);
  }

  async getApplicationDetail(id: number) {
    return this.get<Application>(`/applications/manage/${id}/`);
  }

  async updateApplicationStatus(id: number, status: string, notes?: string) {
    return this.post<Application>(`/applications/manage/${id}/update_status/`, { status, notes });
  }

  async addApplicationNotes(id: number, notes: string) {
    return this.post(`/applications/manage/${id}/add_notes/`, { notes });
  }

  async getApplicationInterviews(id: number) {
    return this.get<Interview[]>(`/applications/manage/${id}/interviews/`);
  }

  async scheduleInterview(applicationId: number, data: {
    interview_type: string;
    scheduled_at: string;
    duration_minutes?: number;
    location?: string;
    meeting_link?: string;
    interviewers?: number[];
  }) {
    return this.post<Interview>(`/applications/manage/${applicationId}/schedule_interview/`, data);
  }

  // Interview Management Endpoints
  async getInterviews(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<Interview>>(`/applications/interviews/${query}`);
  }

  async getInterview(id: number) {
    return this.get<Interview>(`/applications/interviews/${id}/`);
  }

  async updateInterview(id: number, data: Partial<Interview>) {
    return this.patch<Interview>(`/applications/interviews/${id}/`, data);
  }

  async deleteInterview(id: number) {
    return this.delete(`/applications/interviews/${id}/`);
  }

  async completeInterview(id: number, feedback: string, rating?: number) {
    return this.post<Interview>(`/applications/interviews/${id}/complete/`, { feedback, rating });
  }

  async cancelInterview(id: number) {
    return this.post<Interview>(`/applications/interviews/${id}/cancel/`);
  }

  // Job Management Endpoints (for Recruiters)
  async getJobsManage(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<Job>>(`/jobs/manage/${query}`);
  }

  async createJob(data: Partial<Job>) {
    return this.post<Job>('/jobs/manage/', data);
  }

  async updateJob(id: number, data: Partial<Job>) {
    return this.patch<Job>(`/jobs/manage/${id}/`, data);
  }

  async deleteJobManage(id: number) {
    return this.delete(`/jobs/manage/${id}/`);
  }

  async toggleJobActive(id: number) {
    return this.post<{ is_active: boolean }>(`/jobs/manage/${id}/toggle_active/`);
  }

  async toggleJobFeatured(id: number) {
    return this.post<{ is_featured: boolean }>(`/jobs/manage/${id}/toggle_featured/`);
  }

  // User Skills & Experience Endpoints
  async getUserSkills() {
    return this.get<UserSkill[]>('/auth/skills/');
  }

  async addUserSkill(data: { name: string; level: number }) {
    return this.post<UserSkill>('/auth/skills/', data);
  }

  async updateUserSkill(id: number, data: { name?: string; level?: number }) {
    return this.patch<UserSkill>(`/auth/skills/${id}/`, data);
  }

  async deleteUserSkill(id: number) {
    return this.delete(`/auth/skills/${id}/`);
  }

  async getUserExperiences() {
    return this.get<UserExperience[]>('/auth/experiences/');
  }

  async addUserExperience(data: {
    company: string;
    title: string;
    location?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
  }) {
    return this.post<UserExperience>('/auth/experiences/', data);
  }

  async updateUserExperience(id: number, data: Partial<UserExperience>) {
    return this.patch<UserExperience>(`/auth/experiences/${id}/`, data);
  }

  async deleteUserExperience(id: number) {
    return this.delete(`/auth/experiences/${id}/`);
  }

  // Admin verify user
  async adminVerifyUser(id: number) {
    return this.post(`/auth/admin/users/${id}/verify/`);
  }

  // Contact Form
  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return this.post<ContactFormResponse>('/contact/', data);
  }

  // Admin Contact Messages
  async adminGetContactMessages(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.get<PaginatedResponse<ContactMessage>>(`/admin/messages/${query}`);
  }

  async adminGetContactMessage(id: number) {
    return this.get<ContactMessage>(`/admin/messages/${id}/`);
  }

  async adminUpdateContactMessage(id: number, data: { status?: string; admin_notes?: string }) {
    return this.patch<ContactMessage>(`/admin/messages/${id}/`, data);
  }

  async adminDeleteContactMessage(id: number) {
    return this.delete(`/admin/messages/${id}/`);
  }

  async adminMarkContactReplied(id: number) {
    return this.post(`/admin/messages/${id}/mark_replied/`);
  }

  async adminArchiveContact(id: number) {
    return this.post(`/admin/messages/${id}/archive/`);
  }

  async adminGetContactStats() {
    return this.get<ContactStats>('/admin/messages/stats/');
  }
}

export class ApiError extends Error {
  constructor(public status: number, public data: unknown) {
    super(`API Error: ${status}`);
    this.name = 'ApiError';
  }
}

// Types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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
  job_type: string;
  experience_level: string;
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
  applications_count: number;
  is_saved?: boolean;
  has_applied?: boolean;
  benefits?: { id: number; title: string; description: string; icon: string }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  jobs_count?: number;
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
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interview' | 'offered' | 'hired' | 'rejected' | 'withdrawn';
  match_score: number | null;
  applied_date: string;
}

export interface SavedJob {
  id: number;
  job: Job;
  saved_at: string;
}

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

export interface AdminOverview {
  users: { total: number; candidates: number; recruiters: number; new_this_month: number };
  jobs: { total: number; active: number; new_this_month: number };
  applications: { total: number; pending: number; new_this_month: number };
  hiring: { interviews_scheduled: number; offers_made: number; total_hires: number; hires_this_month: number };
}

export interface Interview {
  id: number;
  interview_type: 'phone' | 'video' | 'onsite' | 'technical' | 'final';
  interview_type_display?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
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

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    subject: string;
  };
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  subject_display: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  status_display: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
  replied_at: string | null;
  admin_notes: string | null;
}

export interface ContactStats {
  total: number;
  by_status: {
    new: number;
    read: number;
    replied: number;
    archived: number;
  };
  by_subject: Record<string, number>;
}

export type { User, TokenResponse };
export const api = new ApiService();
export default api;
