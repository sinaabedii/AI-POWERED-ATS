'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/contact';

// Dynamic imports for client-only components
const ContactMap = dynamic(() => import('@/components/contact/ContactMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <span className="text-slate-400 dark:text-slate-500">Loading map...</span>
    </div>
  ),
});

// Constants
const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    details: ['Vali-Asr Street, Mellat Park', 'Tehran, Iran'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    details: ['contact@ariantalent.com', 'support@ariantalent.com'],
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    details: ['+98 21 1234 5678', '+98 912 345 6789'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: ClockIcon,
    title: 'Working Hours',
    details: ['Sat - Wed: 9:00 - 18:00', 'Thu: 9:00 - 13:00'],
    color: 'from-amber-500 to-orange-600',
  },
] as const;

const DEPARTMENTS = [
  { name: 'General Inquiries', email: 'info@ariantalent.com' },
  { name: 'Technical Support', email: 'support@ariantalent.com' },
  { name: 'Sales & Partnerships', email: 'sales@ariantalent.com' },
  { name: 'Career Opportunities', email: 'careers@ariantalent.com' },
] as const;

const FAQS = [
  {
    question: 'How quickly will I get a response?',
    answer: 'We typically respond within 24 hours during business days.',
  },
  {
    question: 'Can I schedule a demo?',
    answer: 'Yes! Contact our sales team to schedule a personalized demo.',
  },
  {
    question: 'Do you offer phone support?',
    answer: 'Phone support is available during business hours for premium clients.',
  },
] as const;

const SOCIAL_LINKS = ['LinkedIn', 'Twitter', 'Instagram', 'Telegram'] as const;

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <ContactInfoSection />
      <MainContactSection />
      <FAQSection />
      <SocialSection />
    </>
  );
}

// Section Components
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <Badge variant="gradient" className="mb-6">
          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
          Get in Touch
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          We&apos;d Love to
          <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Hear From You
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
          Have questions about our platform? Want to partner with us?
          Our team is here to help you succeed in your recruitment journey.
        </p>
      </div>
    </section>
  );
}

function ContactInfoSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_INFO.map((info, index) => (
            <ContactInfoCard key={index} {...info} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({ icon: Icon, title, details, color }: typeof CONTACT_INFO[number]) {
  return (
    <Card hover className="group">
      <CardContent className="p-6 text-center">
        <div className={cn(
          "w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center",
          "group-hover:scale-110 transition-transform duration-300",
          color
        )}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        {details.map((detail, i) => (
          <p key={i} className="text-slate-600 dark:text-slate-400 text-sm">
            {detail}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

function MainContactSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Column */}
          <div>
            <Badge variant="secondary" className="mb-4">Send a Message</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Drop Us a Line
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>

          {/* Map & Info Column */}
          <div className="space-y-8">
            <MapSection />
            <DepartmentsCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <div>
      <Badge variant="secondary" className="mb-4">Our Location</Badge>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Find Us Here
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Visit our headquarters in the heart of Tehran.
      </p>
      <Card className="overflow-hidden">
        <div className="h-[350px] sm:h-[400px]">
          <ContactMap />
        </div>
      </Card>
    </div>
  );
}

function DepartmentsCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <BuildingOffice2Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Contact by Department
          </h3>
        </div>
        <div className="space-y-3">
          {DEPARTMENTS.map((dept, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              <span className="text-slate-700 dark:text-slate-300">{dept.name}</span>
              <a
                href={`mailto:${dept.email}`}
                className="text-violet-600 dark:text-violet-400 hover:underline text-sm font-medium"
              >
                {dept.email}
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FAQSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto grid gap-4">
          {FAQS.map((faq, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-violet-600 to-purple-700">
      <div className="container-custom text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <GlobeAltIcon className="h-8 w-8 text-white" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Connect With Us
          </h2>
        </div>
        <p className="text-violet-100 mb-8 max-w-xl mx-auto">
          Follow us on social media for the latest updates, job tips, and industry insights.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social}
              href="#"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl text-white font-medium transition-all hover:scale-105"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
