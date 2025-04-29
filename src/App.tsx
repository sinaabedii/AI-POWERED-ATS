import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { HomePage } from "./pages/public/Home";
import { JobsPage } from "./pages/public/JobsPage";
import { AboutPage } from "./pages/public/AboutPage";
import { UserDashboard } from "./pages/dashboard/UserDashboard";
import { DashboardHome } from "./pages/dashboard/Dashboard";
import { JobsManagement } from "./pages/dashboard/JobsManagement";
import { JobApplicantsPage } from "./pages/dashboard/JobApplicantsPage";
import { ApplicationDetailPage } from "./pages/dashboard/ApplicationDetailPage";
import { ApplicantsManagement } from "./pages/dashboard/ApplicantsManagement";
import { AnalyticsPage } from "./pages/dashboard/AnalyticsPage";
import { SettingsPage } from "./pages/dashboard/SettingsPage";
import { JobDetailPage } from "./pages/public/JobDetailPage";
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { ProtectedRoute } from "./pages/auth/ProtectedRoute";
import { AdminRoute } from "./pages/auth/AdminRoute";
import { UserApplicationDetail } from "./pages/dashboard/UserApplicationDetail";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard/user" replace />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/user"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/my-applications/:applicationId"
              element={
                <ProtectedRoute>
                  <UserApplicationDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/admin"
              element={
                <AdminRoute>
                  <DashboardHome />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/jobs"
              element={
                <AdminRoute>
                  <JobsManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/jobs/:jobId/applicants"
              element={
                <AdminRoute>
                  <JobApplicantsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/applications/:applicationId"
              element={
                <AdminRoute>
                  <ApplicationDetailPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/applicants"
              element={
                <AdminRoute>
                  <ApplicantsManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <AdminRoute>
                  <AnalyticsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
