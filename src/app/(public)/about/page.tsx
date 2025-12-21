'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  SparklesIcon,
  RocketLaunchIcon,
  HeartIcon,
  GlobeAltIcon,
  UserGroupIcon,
  TrophyIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Active Users', value: '50K+', icon: UserGroupIcon },
  { label: 'Jobs Posted', value: '10K+', icon: RocketLaunchIcon },
  { label: 'Successful Hires', value: '25K+', icon: TrophyIcon },
  { label: 'Companies', value: '2K+', icon: BuildingOffice2Icon },
];

const values = [
  {
    title: 'Innovation First',
    description: 'We leverage cutting-edge AI technology to revolutionize the hiring process.',
    icon: SparklesIcon,
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'People Centered',
    description: 'Every feature we build focuses on improving the experience for both recruiters and candidates.',
    icon: HeartIcon,
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Global Reach',
    description: 'Connect with talent from around the world with our multilingual platform.',
    icon: GlobeAltIcon,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Excellence Driven',
    description: 'We strive for excellence in everything we do, from code to customer service.',
    icon: TrophyIcon,
    color: 'from-amber-500 to-orange-600',
  },
];

const team = [
  { name: 'Sarah Johnson', role: 'CEO & Founder', avatar: 'SJ' },
  { name: 'Michael Chen', role: 'CTO', avatar: 'MC' },
  { name: 'Emily Davis', role: 'Head of Product', avatar: 'ED' },
  { name: 'James Wilson', role: 'Head of AI', avatar: 'JW' },
];

const benefits = [
  { id: 1, title: 'Health Insurance' },
  { id: 2, title: 'Remote Work' },
  { id: 3, title: '401k Match' },
  { id: 4, title: 'Unlimited PTO' },
  { id: 5, title: 'Learning Budget' },
  { id: 6, title: 'Team Events' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-950" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <Badge variant="gradient" className="mb-6">
            <SparklesIcon className="h-4 w-4 mr-2" />
            About AryanTalent
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforming How
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Companies Hire Talent
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            AryanTalent is a leading AI-powered recruitment platform by Aryan Saeed Holding, helping companies find the best talent efficiently.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Making Hiring Smarter, Faster, and Fairer
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                We believe that finding the right talent shouldn&apos;t be a painful process. 
                Our AI-powered platform streamlines recruitment, reduces bias, and helps 
                companies build diverse, high-performing teams.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                From automated resume screening to intelligent candidate matching, 
                we&apos;re building the future of recruitment technology.
              </p>
              <Link href="/jobs">
                <Button size="lg">
                  <RocketLaunchIcon className="h-5 w-5 mr-2" />
                  Explore Opportunities
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center">
                  <SparklesIcon className="h-32 w-32 text-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} hover className="text-center group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Benefits</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Work With Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.id} hover>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center mb-4">
                    <TrophyIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We offer competitive {benefit.title.toLowerCase()} to all our employees.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Meet the Leadership
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-violet-600 dark:text-violet-400">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-purple-700">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-violet-100 mb-8">
                Have questions? We&apos;d love to hear from you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-violet-100">123 Tech Street, San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-violet-100">contact@aryantalent.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-violet-100">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-8">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  />
                  <Button variant="glass" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
