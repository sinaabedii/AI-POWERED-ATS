'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth-store';
import { useThemeStore } from '@/store/theme-store';
import { useUserSkills, useUserExperiences } from '@/hooks/useProfile';
import api from '@/lib/api';
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  PaintBrushIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  CheckIcon,
  LinkIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PlusIcon,
  TrashIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const notificationSettings = [
  { id: 'email_applications', title: 'New Applications', description: 'Get notified when someone applies', enabled: true },
  { id: 'email_interviews', title: 'Interview Reminders', description: 'Receive reminders about interviews', enabled: true },
  { id: 'email_status', title: 'Status Updates', description: 'Get updates when status changes', enabled: false },
  { id: 'browser', title: 'Browser Notifications', description: 'Show desktop notifications', enabled: false },
];

const integrations = [
  { name: 'LinkedIn', description: 'Import candidates', connected: true, icon: '💼' },
  { name: 'Indeed', description: 'Post jobs directly', connected: false, icon: '🔍' },
  { name: 'Slack', description: 'Get notifications', connected: true, icon: '💬' },
  { name: 'Google Calendar', description: 'Sync schedules', connected: false, icon: '📅' },
];

export default function SettingsPage() {
  const { user, updateProfile, changePassword, isLoading, error, clearError, refreshUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { skills, addSkill, deleteSkill, isLoading: skillsLoading } = useUserSkills();
  const { experiences, addExperience, deleteExperience, isLoading: expLoading } = useUserExperiences();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [newSkill, setNewSkill] = useState({ name: '', level: 2 });
  const [newExperience, setNewExperience] = useState({
    company: '', title: '', location: '', start_date: '', end_date: '', is_current: false, description: ''
  });
  const [notifications, setNotifications] = useState(notificationSettings);
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    title: user?.title || '',
    company: user?.company || '',
    bio: user?.bio || '',
    location: user?.location || '',
    linkedin_url: user?.linkedin_url || '',
  });
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(user?.resume_url || null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'resume', label: 'Resume', icon: DocumentTextIcon },
    { id: 'skills', label: 'Skills', icon: AcademicCapIcon },
    { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'appearance', label: 'Appearance', icon: PaintBrushIcon },
  ];

  const handleSaveProfile = async () => {
    clearError();
    const success = await updateProfile(profileData);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleChangePassword = async () => {
    clearError();
    if (passwordData.new_password !== passwordData.confirm_password) {
      return;
    }
    const success = await changePassword(passwordData.old_password, passwordData.new_password);
    if (success) {
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences</p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckIcon className="h-5 w-5" />
            Changes saved successfully!
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-violet-500" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.first_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-sm text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.first_name}
                      onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      disabled
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                      placeholder="e.g. Software Engineer"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
                  <textarea
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resume */}
          {activeTab === 'resume' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DocumentTextIcon className="h-5 w-5 text-violet-500" />
                  Resume / CV
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <p className="text-slate-600 dark:text-slate-400">
                  Upload your resume to apply for jobs faster. Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
                
                {/* Current Resume */}
                {resumeUrl && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-8 w-8 text-emerald-600" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Resume uploaded</p>
                          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-600 hover:underline">
                            View Resume
                          </a>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setResumeUrl(null)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Upload Area */}
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-violet-500 transition-colors cursor-pointer"
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setResumeFile(file);
                    }}
                  />
                  <DocumentArrowUpIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-slate-500">PDF, DOC, DOCX up to 5MB</p>
                </div>
                
                {resumeFile && (
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-6 w-6 text-violet-500" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{resumeFile.name}</p>
                        <p className="text-sm text-slate-500">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setResumeFile(null)}>
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        disabled={uploadingResume}
                        onClick={async () => {
                          if (!resumeFile) return;
                          setUploadingResume(true);
                          try {
                            const result = await api.uploadResume(resumeFile);
                            setResumeUrl(result.resume_url);
                            setResumeFile(null);
                            await refreshUser(); // Refresh user to get updated resume_url
                            setSaveSuccess(true);
                            setTimeout(() => setSaveSuccess(false), 3000);
                          } catch {
                            alert('Failed to upload resume');
                          } finally {
                            setUploadingResume(false);
                          }
                        }}
                      >
                        {uploadingResume ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AcademicCapIcon className="h-5 w-5 text-violet-500" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Add New Skill */}
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Skill Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g. JavaScript, Python, React"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div className="w-40">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Level</label>
                    <select
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value={1}>Beginner</option>
                      <option value={2}>Intermediate</option>
                      <option value={3}>Advanced</option>
                      <option value={4}>Expert</option>
                    </select>
                  </div>
                  <Button
                    onClick={async () => {
                      if (newSkill.name) {
                        await addSkill(newSkill);
                        setNewSkill({ name: '', level: 2 });
                      }
                    }}
                    disabled={!newSkill.name || skillsLoading}
                    leftIcon={<PlusIcon className="h-4 w-4" />}
                  >
                    Add
                  </Button>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {skillsLoading ? (
                    <div className="text-center py-8 text-slate-500">Loading skills...</div>
                  ) : skills.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">No skills added yet</div>
                  ) : (
                    skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-slate-900 dark:text-white">{skill.name}</span>
                          <Badge variant={skill.level >= 3 ? 'success' : 'secondary'} size="sm">
                            {skill.level_display || ['Beginner', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => deleteSkill(skill.id)}>
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experience */}
          {activeTab === 'experience' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5 text-violet-500" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Add New Experience */}
                <div className="p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl space-y-4">
                  <h4 className="font-medium text-slate-900 dark:text-white">Add New Experience</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                      <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={newExperience.title}
                        onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={newExperience.start_date}
                        onChange={(e) => setNewExperience({ ...newExperience, start_date: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">End Date</label>
                      <input
                        type="date"
                        value={newExperience.end_date}
                        onChange={(e) => setNewExperience({ ...newExperience, end_date: e.target.value })}
                        disabled={newExperience.is_current}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_current"
                      checked={newExperience.is_current}
                      onChange={(e) => setNewExperience({ ...newExperience, is_current: e.target.checked, end_date: '' })}
                      className="rounded border-slate-300"
                    />
                    <label htmlFor="is_current" className="text-sm text-slate-600 dark:text-slate-400">I currently work here</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                  </div>
                  <Button
                    onClick={async () => {
                      if (newExperience.company && newExperience.title && newExperience.start_date) {
                        await addExperience(newExperience);
                        setNewExperience({ company: '', title: '', location: '', start_date: '', end_date: '', is_current: false, description: '' });
                      }
                    }}
                    disabled={!newExperience.company || !newExperience.title || !newExperience.start_date || expLoading}
                    leftIcon={<PlusIcon className="h-4 w-4" />}
                  >
                    Add Experience
                  </Button>
                </div>

                {/* Experience List */}
                <div className="space-y-4">
                  {expLoading ? (
                    <div className="text-center py-8 text-slate-500">Loading experiences...</div>
                  ) : experiences.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">No experience added yet</div>
                  ) : (
                    experiences.map((exp) => (
                      <div key={exp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{exp.title}</h4>
                            <p className="text-slate-600 dark:text-slate-400">{exp.company}</p>
                            <p className="text-sm text-slate-500 mt-1">
                              {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                              {exp.is_current ? ' Present' : exp.end_date ? ` ${new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
                              {exp.duration && <span className="ml-2">({exp.duration})</span>}
                            </p>
                            {exp.description && <p className="text-sm text-slate-500 mt-2">{exp.description}</p>}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-violet-500" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    📌 Notification settings are saved locally. Email notifications coming soon.
                  </p>
                </div>
                <div className="space-y-4">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{n.title}</h4>
                        <p className="text-sm text-slate-500">{n.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(n.id)}
                        className={cn(
                          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                          n.enabled ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-700'
                        )}
                      >
                        <span className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                          n.enabled ? 'translate-x-6' : 'translate-x-1'
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyIcon className="h-5 w-5 text-violet-500" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  {passwordData.new_password && passwordData.confirm_password && 
                   passwordData.new_password !== passwordData.confirm_password && (
                    <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button 
                  onClick={handleChangePassword} 
                  disabled={isLoading || passwordData.new_password !== passwordData.confirm_password}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-violet-500" />
                  Connected Apps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4 p-3 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl">
                  <p className="text-sm text-violet-600 dark:text-violet-400">
                    🚀 Third-party integrations are coming soon. Stay tuned!
                  </p>
                </div>
                <div className="space-y-4">
                  {integrations.map((i, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{i.icon}</span>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{i.name}</h4>
                          <p className="text-sm text-slate-500">{i.description}</p>
                        </div>
                      </div>
                      {i.connected ? (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckIcon className="h-3 w-3" />
                          Connected
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm">Connect</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PaintBrushIcon className="h-5 w-5 text-violet-500" />
                  Theme Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', label: 'Light', icon: SunIcon },
                    { id: 'dark', label: 'Dark', icon: MoonIcon },
                    { id: 'system', label: 'System', icon: ComputerDesktopIcon },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTheme(option.id as 'light' | 'dark' | 'system')}
                      className={cn(
                        'flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all',
                        theme === option.id
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      )}
                    >
                      <option.icon className={cn('h-8 w-8', theme === option.id ? 'text-violet-600' : 'text-slate-400')} />
                      <span className={cn('font-medium', theme === option.id ? 'text-violet-600' : 'text-slate-600 dark:text-slate-400')}>
                        {option.label}
                      </span>
                      {theme === option.id && <CheckIcon className="h-5 w-5 text-violet-600" />}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
