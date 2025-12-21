'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/jobs/job-card';
import { useFeaturedJobs, useCategories } from '@/hooks/useJobs';
import {
  SparklesIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: SparklesIcon,
    title: 'AI-Powered Matching',
    description: 'Our intelligent algorithms match candidates with the perfect opportunities.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Fast Application',
    description: 'Apply to multiple jobs with just one click using your saved profile.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: ChartBarIcon,
    title: 'Real-time Analytics',
    description: 'Track your applications and get insights on your job search progress.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Verified Companies',
    description: 'All companies on our platform are verified for your safety.',
    color: 'from-amber-500 to-orange-600',
  },
];

const stats = [
  { value: '50K+', label: 'Active Users', icon: UserGroupIcon },
  { value: '10K+', label: 'Jobs Posted', icon: BriefcaseIcon },
  { value: '2K+', label: 'Companies', icon: BuildingOffice2Icon },
];

export default function HomePage() {
  const { jobs: featuredJobs, isLoading: jobsLoading } = useFeaturedJobs();
  const { categories, isLoading: categoriesLoading } = useCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="gradient" className="mb-6">
              <SparklesIcon className="h-4 w-4 mr-2" />
              AI-Powered Recruitment Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Dream Job with
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Matching
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills, 
              experience, and career goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Jobs
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="glass" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose ArianTalent?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with a user-friendly interface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Categories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Explore by Category
            </h2>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((category) => (
                <Link key={category.id} href={`/jobs?category=${category.id}`}>
                  <Card hover className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                        <BriefcaseIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {category.jobs_count || 0} jobs
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">Featured</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Featured Jobs
              </h2>
            </div>
            <Link href="/jobs">
              <Button variant="outline">
                View All Jobs
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {jobsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">No featured jobs available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-violet-100 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="glass">
                Get Started Free
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
