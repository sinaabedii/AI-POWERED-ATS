export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'hr' | 'recruiter';
    avatar?: string;
  }