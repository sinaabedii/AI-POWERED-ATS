'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import {
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithOTP, sendOTP, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [devCode, setDevCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(phone, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  const handleSendOTP = async () => {
    clearError();
    const result = await sendOTP(phone, 'login');
    if (result.success) {
      setOtpSent(true);
      if (result.code) {
        setDevCode(result.code);
      }
    }
  };

  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await loginWithOTP(phone, otpCode);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 mb-8">
            <Image 
              src="/images/logo/logo.png" 
              alt="AryanTalent Logo" 
              width={72}
              height={72}
              className="rounded-xl object-contain"
            />
            <span className="text-3xl font-bold text-slate-900 dark:text-white">AryanTalent</span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Sign in to your account to continue
          </p>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => { setLoginMethod('password'); setOtpSent(false); clearError(); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                loginMethod === 'password'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => { setLoginMethod('otp'); clearError(); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                loginMethod === 'otp'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              OTP Login
            </button>
          </div>

          {/* Password Login Form */}
          {loginMethod === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-6">
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
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm font-medium text-violet-600 hover:text-violet-500">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </form>
          )}

          {/* OTP Login Form */}
          {loginMethod === 'otp' && (
            <form onSubmit={handleOTPLogin} className="space-y-6">
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
                    disabled={otpSent}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {!otpSent ? (
                <Button type="button" className="w-full" onClick={handleSendOTP} disabled={isLoading || !phone}>
                  {isLoading ? 'Sending...' : 'Send OTP Code'}
                </Button>
              ) : (
                <>
                  {devCode && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        Dev Mode - Your code: <span className="font-mono font-bold">{devCode}</span>
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      required
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 text-center text-2xl tracking-widest font-mono"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || otpCode.length !== 6}>
                    {isLoading ? 'Verifying...' : 'Sign In'}
                  </Button>

                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtpCode(''); setDevCode(''); }}
                    className="w-full text-sm text-slate-500 hover:text-violet-600"
                  >
                    Change phone number
                  </button>
                </>
              )}

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </form>
          )}

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-violet-600 hover:text-violet-500">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-md text-white text-center">
          <div className="w-36 h-36 mx-auto mb-8 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center p-4">
            <Image 
              src="/images/logo/logo.png" 
              alt="AryanTalent Logo" 
              width={112}
              height={112}
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">AI-Powered Recruitment</h2>
          <p className="text-violet-100">
            Experience the future of hiring with intelligent matching, automated screening, and data-driven insights.
          </p>
        </div>
      </div>
    </div>
  );
}
