// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Auth Pages

// Public Pages
import { HomePage } from './pages/public/Home';
import { JobsPage } from './pages/public/JobsPage';
import { AboutPage } from './pages/public/AboutPage';

// Dashboard Pages
import { DashboardHome } from './pages/dashboard/Dashboard';
import { JobsManagement } from './pages/dashboard/JobsManagement';
import { ApplicantsManagement } from './pages/dashboard/ApplicantsManagement';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { ProtectedRoute } from './pages/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/jobs" element={
              <ProtectedRoute>
                <JobsManagement />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/applicants" element={
              <ProtectedRoute>
                <ApplicantsManagement />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/analytics" element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;