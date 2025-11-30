import { Application, Company, Job, JobCategory } from '@/types';

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    category: 'Tech',
    location: 'Remote',
    description: 'We are looking for a talented Frontend Developer to join our growing team.',
    summary: 'Join our engineering team to build amazing user interfaces using React, TypeScript, and modern frontend technologies.',
    about: 'TechRide is a fast-growing tech company focused on building intuitive and innovative software solutions.',
    responsibilities: [
      'Develop and maintain client-side applications using React and TypeScript',
      'Collaborate with backend developers to integrate RESTful APIs',
      'Optimize applications for maximum speed and scalability',
      'Build reusable code and libraries for future use',
      'Implement responsive design for web applications',
    ],
    requirements: [
      'Strong proficiency in JavaScript and TypeScript',
      'Experience with React and modern frontend frameworks',
      'Knowledge of modern frontend build pipelines and tools',
      'Familiarity with RESTful APIs and asynchronous request handling',
      'Understanding of cross-browser compatibility issues',
    ],
    postedDate: '2025-04-15',
    isActive: true,
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    category: 'Tech',
    location: 'New York',
    description: 'Looking for a skilled Backend Engineer to develop and optimize our server-side applications.',
    summary: 'Join our backend team to design and implement scalable APIs and services that power our platform.',
    about: 'TechRide builds enterprise-grade software solutions for businesses worldwide.',
    responsibilities: [
      'Design and implement robust, scalable, and secure server-side applications',
      'Create and maintain database schemas and models',
      'Integrate with third-party services and APIs',
      'Optimize backend performance for speed and reliability',
      'Collaborate with frontend developers to integrate APIs',
    ],
    requirements: [
      'Strong experience with Node.js, Python, or Java',
      'Knowledge of database systems (SQL and NoSQL)',
      'Understanding of server-side templating languages',
      'Familiarity with microservices architecture',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
    ],
    postedDate: '2025-04-10',
    isActive: true,
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Product Manager',
    category: 'Product',
    location: 'San Francisco',
    description: 'We are seeking an experienced Product Manager to lead our product development initiatives.',
    summary: 'Join our product team to drive feature development, create roadmaps, and ensure we deliver value to our users.',
    about: 'TechRide is a customer-focused company that builds products with real-world impact.',
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize requirements based on user needs and business objectives',
      'Collaborate with engineering, design, and marketing teams',
      'Monitor product performance and make data-driven decisions',
      'Stay up-to-date with market trends and competition',
    ],
    requirements: [
      'Proven experience as a Product Manager',
      'Strong analytical and problem-solving skills',
      'Excellent communication and presentation abilities',
      'Technical background or knowledge of software development',
      'Experience with agile methodologies',
    ],
    postedDate: '2025-03-28',
    isActive: true,
    createdBy: '1',
  },
];

// Mock Applications Data
export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    userId: '2',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    resumeUrl: '/uploads/resumes/john_doe_resume.pdf',
    coverLetter: 'I am excited to apply for the Frontend Developer position.',
    status: 'reviewed',
    appliedDate: '2025-04-16',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    experience: 3,
    matchScore: 85,
  },
  {
    id: '2',
    jobId: '1',
    userId: '3',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1 (555) 987-6543',
    resumeUrl: '/uploads/resumes/jane_smith_resume.pdf',
    status: 'pending',
    appliedDate: '2025-04-17',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Redux'],
    experience: 2,
    matchScore: 76,
  },
  {
    id: '3',
    jobId: '2',
    userId: '4',
    fullName: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    phoneNumber: '+1 (555) 456-7890',
    resumeUrl: '/uploads/resumes/michael_johnson_resume.pdf',
    coverLetter: 'I am a passionate backend developer with 5 years of experience.',
    status: 'shortlisted',
    appliedDate: '2025-04-12',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
    experience: 5,
    matchScore: 92,
  },
];

// Mock Company Data
export const mockCompany: Company = {
  name: 'TechRide',
  description: 'TechRide is the fastest-growing startup in the region and is powered by a young team that wants to take the IT industry to the next level.',
  location: {
    address: 'Tehran, Tehran, Iran',
    coordinates: { lat: 35.7219, lng: 51.3347 },
  },
  benefits: [
    { id: '1', title: 'Hybrid Working', icon: 'office-building' },
    { id: '2', title: 'Competitive Salary', icon: 'currency-dollar' },
    { id: '3', title: 'Employee Loan', icon: 'cash' },
    { id: '4', title: 'Time Flexibility', icon: 'clock' },
    { id: '5', title: 'In-House Training', icon: 'academic-cap' },
    { id: '6', title: 'Health Insurance', icon: 'heart' },
  ],
  photos: ['/images/office-1.jpg', '/images/office-2.jpg'],
};

// Predefined Users
export const PREDEFINED_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' as const },
  { id: '2', name: 'Regular User', email: 'user@example.com', password: 'user123', role: 'user' as const },
];

// Data Access Functions
export function getJobs(category?: JobCategory): Job[] {
  if (!category || category === 'All') return [...mockJobs];
  return mockJobs.filter((job) => job.category === category);
}

export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id);
}

export function getCategoriesWithCount(): Record<JobCategory, number> {
  const categories: Record<JobCategory, number> = {
    All: 0, Finance: 0, Tech: 0, Product: 0, Commercial: 0,
    'Business Development': 0, Marketing: 0, Operations: 0,
  };
  mockJobs.forEach((job) => {
    categories['All']++;
    categories[job.category]++;
  });
  return categories;
}

export function getApplications(): Application[] {
  return [...mockApplications];
}

export function getApplicationById(id: string): Application | undefined {
  return mockApplications.find((app) => app.id === id);
}

export function getApplicationsByJobId(jobId: string): Application[] {
  return mockApplications.filter((app) => app.jobId === jobId);
}

export function getApplicationsByUserId(userId: string): Application[] {
  return mockApplications.filter((app) => app.userId === userId);
}

export function getCompanyInfo(): Company {
  return mockCompany;
}
