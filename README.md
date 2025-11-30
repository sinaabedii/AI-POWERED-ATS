# ATS System - Next.js 14

A modern AI-powered Applicant Tracking System built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 with App Router
- 📝 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 🔐 Authentication with Zustand
- 📱 Responsive design
- 🎯 Clean architecture

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Demo Credentials

- Admin: admin@example.com / admin123
- User: user@example.com / user123

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (public)/          # Public pages (home, jobs, about)
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── jobs/              # Job-related components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── ui/                # UI components
├── lib/                   # Utilities and data
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```
