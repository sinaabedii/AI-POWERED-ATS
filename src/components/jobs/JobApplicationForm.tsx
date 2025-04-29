import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { createApplication } from '../../services/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { Job } from '../../types/job';
import { ApplicationStatus } from '../../types/applicant';

interface JobApplicationFormProps {
  job: Job;
  onCancel: () => void;
}

export function JobApplicationForm({ job, onCancel }: JobApplicationFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [skills, setSkills] = useState<string[]>(['']);
  const [experience, setExperience] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index: number) => {
    if (skills.length > 1) {
      const newSkills = [...skills];
      newSkills.splice(index, 1);
      setSkills(newSkills);
    }
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!resumeFile) {
      newErrors.resumeFile = 'Resume is required';
    }
    
    if (skills.some(skill => !skill.trim())) {
      newErrors.skills = 'All skill fields must be filled';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const resumeUrl = '/uploads/resumes/mock_resume.pdf';
      const filteredSkills = skills.filter(skill => skill.trim() !== '');
      
      const applicationData = {
        jobId: job.id,
        userId: user.id,
        fullName,
        email,
        phoneNumber,
        resumeUrl,
        coverLetter: coverLetter || undefined,
        status: 'pending' as ApplicationStatus,
        appliedDate: new Date().toISOString(),
        skills: filteredSkills,
        experience,
      };
      
      await createApplication(applicationData);
      
      alert('Your application has been submitted successfully!');
      navigate('/dashboard/user');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
          required
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
          required
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Resume <span className="text-red-500">*</span>
        </label>
        <input
          id="resumeFile"
          type="file"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className={`mt-1 block w-full rounded-md border ${
            errors.resumeFile ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
          accept=".pdf,.doc,.docx"
          required
        />
        {errors.resumeFile ? (
          <p className="mt-1 text-sm text-red-500">{errors.resumeFile}</p>
        ) : (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Accepted formats: PDF, DOC, DOCX
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <input
          id="experience"
          type="number"
          min="0"
          max="50"
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Skills <span className="text-red-500">*</span>
          </label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={handleAddSkill}
          >
            Add Skill
          </Button>
        </div>
        
        {skills.map((skill, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="e.g. JavaScript, React, Project Management"
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemoveSkill(index)}
              disabled={skills.length <= 1}
            >
              Remove
            </Button>
          </div>
        ))}
        {errors.skills && (
          <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Letter (Optional)
        </label>
        <textarea
          id="coverLetter"
          rows={5}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Tell us why you're a good fit for this position..."
        ></textarea>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
}