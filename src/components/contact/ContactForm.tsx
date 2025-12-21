'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircleIcon,
  PaperAirplaneIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import api, { ApiError } from '@/lib/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const SUBJECT_OPTIONS = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'sales', label: 'Sales & Pricing' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'careers', label: 'Careers' },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [fieldErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      await api.submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject,
        message: formData.message.trim(),
      });

      setIsSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      setTimeout(() => setIsSubmitted(false), 10000);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApiError = (err: unknown) => {
    if (err instanceof ApiError) {
      const errorData = err.data as Record<string, unknown>;
      const newFieldErrors: Partial<Record<keyof FormData, string>> = {};

      for (const [key, value] of Object.entries(errorData)) {
        if (key in INITIAL_FORM_DATA) {
          newFieldErrors[key as keyof FormData] = Array.isArray(value) ? value[0] : String(value);
        }
      }

      if (Object.keys(newFieldErrors).length > 0) {
        setFieldErrors(newFieldErrors);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } else {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <Card>
      <CardContent className="p-8">
        {error && <ErrorAlert message={error} />}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={fieldErrors.name}
              placeholder="John Doe"
              required
              minLength={2}
            />
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
              placeholder="+98 912 345 6789"
            />
            <FormSelect
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={fieldErrors.subject}
              options={SUBJECT_OPTIONS}
              required
            />
          </div>

          <FormTextarea
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={fieldErrors.message}
            placeholder="Tell us how we can help you..."
            required
            minLength={10}
            rows={5}
          />

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Sub-components
function SuccessMessage() {
  return (
    <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
          <CheckCircleIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-emerald-600 dark:text-emerald-400">
          Thank you for reaching out. We&apos;ll respond within 24 hours.
        </p>
      </CardContent>
    </Card>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
      <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-red-700 dark:text-red-300 text-sm">{message}</p>
    </div>
  );
}

// Form field components
interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}

function FormField({ label, name, error, required, ...props }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white placeholder-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all",
          error ? "border-red-500" : "border-slate-200 dark:border-slate-700"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}

function FormSelect({ label, name, options, error, required, ...props }: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white",
          "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all",
          error ? "border-red-500" : "border-slate-200 dark:border-slate-700"
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  rows?: number;
}

function FormTextarea({ label, name, error, required, rows = 5, ...props }: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white placeholder-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none",
          error ? "border-red-500" : "border-slate-200 dark:border-slate-700"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default ContactForm;
