'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api, { User, ApiError } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // OTP State
  otpSent: boolean;
  otpPhone: string | null;
  otpVerified: boolean;
  otpPurpose: 'register' | 'login' | 'reset_password' | null;
  
  // Actions
  sendOTP: (phone: string, purpose?: 'register' | 'login' | 'reset_password') => Promise<{ success: boolean; code?: string }>;
  verifyOTP: (phone: string, code: string, purpose?: 'register' | 'login' | 'reset_password') => Promise<boolean>;
  register: (data: {
    phone: string;
    first_name: string;
    last_name: string;
    email?: string;
    password: string;
    password_confirm: string;
    otp_code: string;
  }) => Promise<boolean>;
  login: (phone: string, password: string) => Promise<boolean>;
  loginWithOTP: (phone: string, otp_code: string) => Promise<boolean>;
  resetPassword: (phone: string, otp_code: string, new_password: string, new_password_confirm: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  resetOTP: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      otpSent: false,
      otpPhone: null,
      otpVerified: false,
      otpPurpose: null,

      sendOTP: async (phone: string, purpose: 'register' | 'login' | 'reset_password' = 'register') => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.sendOTP(phone, purpose);
          set({ 
            otpSent: true, 
            otpPhone: phone,
            otpPurpose: purpose,
            isLoading: false 
          });
          return { success: true, code: response.code };
        } catch (error) {
          const message = error instanceof ApiError 
            ? (error.data as { phone?: string[] })?.phone?.[0] || 'Failed to send OTP'
            : 'Failed to send OTP';
          set({ error: message, isLoading: false });
          return { success: false };
        }
      },

      verifyOTP: async (phone: string, code: string, purpose: 'register' | 'login' | 'reset_password' = 'register') => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.verifyOTP(phone, code, purpose);
          if (response.valid) {
            set({ otpVerified: true, isLoading: false });
            return true;
          }
          set({ error: 'Invalid OTP code', isLoading: false });
          return false;
        } catch (error) {
          const message = error instanceof ApiError 
            ? (error.data as { error?: string })?.error || 'Invalid OTP code'
            : 'Failed to verify OTP';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.register(data);
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false,
            otpSent: false,
            otpPhone: null,
            otpVerified: false,
            otpPurpose: null,
          });
          return true;
        } catch (error) {
          const message = error instanceof ApiError 
            ? JSON.stringify(error.data)
            : 'Registration failed';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      login: async (phone: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(phone, password);
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          const message = error instanceof ApiError 
            ? (error.data as { password?: string[]; phone?: string[] })?.password?.[0] || 
              (error.data as { password?: string[]; phone?: string[] })?.phone?.[0] || 
              'Invalid credentials'
            : 'Login failed';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      loginWithOTP: async (phone: string, otp_code: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.loginWithOTP(phone, otp_code);
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false,
            otpSent: false,
            otpPhone: null,
            otpVerified: false,
            otpPurpose: null,
          });
          return true;
        } catch (error) {
          const message = error instanceof ApiError 
            ? (error.data as { otp_code?: string[] })?.otp_code?.[0] || 'Invalid OTP'
            : 'Login failed';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      resetPassword: async (phone: string, otp_code: string, new_password: string, new_password_confirm: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.resetPassword(phone, otp_code, new_password, new_password_confirm);
          set({ 
            isLoading: false,
            otpSent: false,
            otpPhone: null,
            otpVerified: false,
            otpPurpose: null,
          });
          return true;
        } catch (error) {
          const message = error instanceof ApiError 
            ? (error.data as { otp_code?: string[] })?.otp_code?.[0] || 'Failed to reset password'
            : 'Failed to reset password';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await api.logout();
        } finally {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            otpSent: false,
            otpPhone: null,
            otpVerified: false,
            otpPurpose: null,
          });
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await api.updateProfile(data);
          set({ user: updatedUser, isLoading: false });
          return true;
        } catch (error) {
          set({ error: 'Failed to update profile', isLoading: false });
          return false;
        }
      },

      changePassword: async (oldPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.changePassword(oldPassword, newPassword);
          set({ isLoading: false });
          return true;
        } catch (error) {
          const message = error instanceof ApiError 
            ? (error.data as { old_password?: string[] })?.old_password?.[0] || 'Failed to change password'
            : 'Failed to change password';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      refreshUser: async () => {
        if (!api.isAuthenticated()) return;
        try {
          const user = await api.getProfile();
          set({ user, isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
      
      resetOTP: () => set({ 
        otpSent: false, 
        otpPhone: null, 
        otpVerified: false,
        otpPurpose: null,
      }),
    }),
    {
      name: 'aryantalent-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
