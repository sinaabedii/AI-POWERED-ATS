# AryanTalent ATS Frontend

Modern Applicant Tracking System frontend built with Next.js 14, TypeScript, and Tailwind CSS for Aryan Saeed Holding.

## Features

- 🎨 Modern UI with dark mode support
- 🔐 OTP-based authentication
- 📱 Fully responsive design
- 🚀 Server-side rendering with Next.js App Router
- 🎯 Role-based dashboards (Admin, HR, Recruiter, Candidate)
- 📊 Analytics dashboard with charts
- 🔍 Job search with filters
- 📝 Application management

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Heroicons
- class-variance-authority

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register, forgot-password)
│   ├── (public)/          # Public pages (home, jobs, about)
│   └── dashboard/         # Dashboard pages
│       ├── admin/         # Admin panel
│       ├── analytics/     # Analytics dashboard
│       ├── applicants/    # Applicants management
│       ├── jobs/          # Jobs management
│       ├── settings/      # User settings
│       └── user/          # Candidate dashboard
├── components/
│   ├── dashboard/         # Dashboard components
│   ├── jobs/              # Job-related components
│   ├── layout/            # Header, Footer
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
│   ├── useAdmin.ts        # Admin operations
│   ├── useAnalytics.ts    # Analytics data
│   ├── useApplications.ts # Application operations
│   └── useJobs.ts         # Job operations
├── lib/
│   ├── api.ts             # API client
│   ├── constants.ts       # App constants
│   └── utils.ts           # Utility functions
├── store/
│   ├── auth-store.ts      # Authentication state
│   └── theme-store.ts     # Theme state
└── types/
    └── index.ts           # TypeScript types
```

## Pages

### Public Pages
- `/` - Home page with featured jobs
- `/jobs` - Job listings with search and filters
- `/jobs/[slug]` - Job detail page
- `/about` - About page

### Auth Pages
- `/login` - Login (password or OTP)
- `/register` - Registration with OTP verification
- `/forgot-password` - Password reset with OTP

### Dashboard Pages
- `/dashboard` - Redirects based on user role
- `/dashboard/user` - Candidate dashboard
- `/dashboard/jobs` - Jobs management (HR/Recruiter)
- `/dashboard/applicants` - Applicants management
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/admin` - Admin panel
- `/dashboard/settings` - User settings

## API Integration

The frontend connects to the Django backend API. All API calls are handled through the `api.ts` client which:

- Manages JWT tokens (access/refresh)
- Handles token refresh automatically
- Provides typed API methods

### Authentication Flow

1. User enters phone number
2. OTP is sent to phone
3. User verifies OTP
4. User completes registration/login
5. JWT tokens are stored and used for subsequent requests

## User Roles

| Role | Access |
|------|--------|
| Admin | Full access to all features |
| HR | Jobs, applicants, analytics |
| Recruiter | Own jobs and applicants |
| Candidate | Job search, applications |

## Development

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## Connecting to Backend

Make sure the Django backend is running on `http://localhost:8000` or update the `NEXT_PUBLIC_API_URL` environment variable.

```bash
# Backend setup
cd ../ats-backend
docker-compose up -d
docker-compose exec api python manage.py migrate
docker-compose exec api python manage.py seed_data
```

## License

MIT
