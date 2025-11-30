'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';
import { PREDEFINED_USERS } from '@/lib/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      error: null,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundUser = PREDEFINED_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isAdmin: userWithoutPassword.role === 'admin',
          });
          return true;
        }

        set({ error: 'Invalid email or password' });
        return false;
      },

      register: async (
        _name: string,
        email: string,
        _password: string,
        _role: UserRole = 'user'
      ): Promise<boolean> => {
        set({ error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (PREDEFINED_USERS.some((u) => u.email === email)) {
          set({ error: 'Email already exists' });
          return false;
        }

        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAdmin: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ats-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
