import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ChatBot } from '@/components/chatbot';
import './globals.css';

export const metadata: Metadata = {
  title: 'ArianTalent - AI Powered Applicant Tracking System',
  description: 'ArianTalent ATS - Modern AI-powered applicant tracking system for efficient hiring',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
