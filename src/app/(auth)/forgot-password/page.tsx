'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import {
  SparklesIcon,
  PhoneIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

type Step = 'phone' | 'otp' | 'password' | 'success';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { sendOTP, verifyOTP, resetPassword, isLoading, error, clearError, resetOTP } = useAuthStore();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [devCode, setDevCode] = useState('');
  const [passwords, setPasswords] = useState({
    new_password: '',
    new_password_confirm: '',
  });

  useEffect(() => {
    return () => {
      resetOTP();
      clearError();
    };
  }, [resetOTP, clearError]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const result = await sendOTP(phone, 'reset_password');
    if (result.success) {
      setStep('otp');
      if (result.code) {
        setDevCode(result.code);
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await verifyOTP(phone, otpCode, 'reset_password');
    if (success) {
      setStep('password');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (passwords.new_password !== passwords.new_password_confirm) {
      return;
    }

    const success = await resetPassword(
      phone,
      otpCode,
      passwords.new_password,
      passwords.new_password_confirm
    );

    if (success) {
      setStep('success');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">ArianTalent</span>
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {/* Back Link */}
          {step !== 'success' && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-6"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to login
            </Link>
          )}

          {/* Step 1: Phone */}
          {step === 'phone' && (
            <>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Forgot password?
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Enter your phone number and we&apos;ll send you a code to reset your password.
              </p>

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Code'}
                </Button>
              </form>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Enter verification code
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                We sent a code to <span className="font-medium text-slate-900 dark:text-white">{phone}</span>
              </p>

              {devCode && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Dev Mode - Your code: <span className="font-mono font-bold">{devCode}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full" disabled={isLoading || otpCode.length !== 6}>
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="w-full text-sm text-slate-500 hover:text-violet-600"
                >
                  Use a different phone number
                </button>
              </form>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 'password' && (
            <>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Create new password
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Your new password must be at least 8 characters long.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      value={passwords.new_password}
                      onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      value={passwords.new_password_confirm}
                      onChange={(e) => setPasswords({ ...passwords, new_password_confirm: e.target.value })}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  {passwords.new_password && passwords.new_password_confirm && 
                   passwords.new_password !== passwords.new_password_confirm && (
                    <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || passwords.new_password !== passwords.new_password_confirm}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <CheckCircleIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Password reset successful!
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Your password has been reset. You can now sign in with your new password.
              </p>
              <Link href="/login">
                <Button className="w-full">Go to Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
