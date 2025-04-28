import { Job, JobCategory } from "../types/job";
import { Applicant } from "../types/applicant";
import { Company } from "../types/company";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "General Accountant",
    category: "Finance",
    location: "Tehran, Tehran, Iran, Islamic Republic of",
    description:
      "We are seeking a highly motivated and detail-oriented Accountant to join our finance team. As an Accountant, you will play a vital role in maintaining accurate financial records and supporting various accounting functions.",
    summary:
      "We are seeking a highly motivated and detail-oriented Accountant to join our finance team. As an Accountant, you will play a vital role in maintaining accurate financial records and supporting various accounting functions. The ideal candidate is a quick learner, possesses excellent analytical skills, and has a strong passion for numbers and finance.",
    about:
      "Our company is the pioneer provider of ride-hailing mobile solutions that connects smartphone owners in need of a ride to drivers who use their private cars offering transportation services. We are ambitious, passionate, engaged, and excited about pushing the boundaries of the transportation industry to new frontiers and be the first choice of each user.",
    responsibilities: [
      "Record daily accounting entries and perform daily accounting routine functions.",
      "Reconcile accounts payable and receivable.",
      "Account reconciliation between group companies and contractors.",
      "Conduct regular audits of financial data to identify discrepancies and errors.",
      "Assist with month-end closing, general ledger entries, account, and variance analysis, monthly reporting of variances, calculate and record various accruals.",
      "Maintain and establish policies and procedures related to financial affairs.",
    ],
    requirements: [
      "Minimum Bachelor's degree in Accounting/Economics/Finance or any related field.",
      "At least two years of relevant work experience.",
      "Familiarity with ERP (preferably Microsoft System).",
      "Familiarity with Moadian.",
      "Good knowledge of tax rules.",
      "Good time management skills.",
      "Good knowledge of Microsoft Excel.",
      "Good problem-solving and analytical skills.",
      "Results-oriented.",
      "English knowledge is an advantage.",
    ],
    postedDate: "2023-08-01",
    isActive: true,
  },
  {
    id: "2",
    title: "Software Engineer (Golang)",
    category: "Tech",
    location: "Tehran, Tehran, Iran, Islamic Republic of",
    description:
      "We are looking for a skilled Golang developer to join our engineering team.",
    summary:
      "Join our team of talented engineers to build scalable services and help us drive innovation in the transportation industry. As a Golang developer, you will work on critical backend systems that power our platform.",
    about:
      "Our company is the pioneer provider of ride-hailing mobile solutions that connects smartphone owners in need of a ride to drivers who use their private cars offering transportation services. We are ambitious, passionate, engaged, and excited about pushing the boundaries of the transportation industry to new frontiers and be the first choice of each user.",
    responsibilities: [
      "Design and develop high-performance, reliable, and maintainable services in Go",
      "Work collaboratively in cross-functional teams",
      "Optimize application performance and scalability",
      "Implement effective testing strategies",
      "Contribute to architectural decisions and best practices",
      "Mentor junior developers and participate in code reviews",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Minimum 3 years of software development experience",
      "Proficiency in Golang with a strong understanding of its features and best practices",
      "Experience with RESTful APIs and microservices architecture",
      "Familiarity with SQL and NoSQL databases",
      "Strong knowledge of data structures, algorithms, and distributed systems",
      "Experience with Docker containers and Kubernetes is a plus",
      "Good communication skills and ability to work in a team",
    ],
    postedDate: "2023-07-15",
    isActive: true,
  },
  {
    id: "3",
    title: "Junior User Researcher",
    category: "Product",
    location: "Tehran, Tehran, Iran, Islamic Republic of",
    description:
      "We are seeking a passionate Junior User Researcher to help us understand user needs and behaviors.",
    summary:
      "Join our product team and help us discover user insights that will shape our product development. You will be responsible for planning and conducting user research to improve our customer experience.",
    about:
      "Our company is the pioneer provider of ride-hailing mobile solutions that connects smartphone owners in need of a ride to drivers who use their private cars offering transportation services. We are ambitious, passionate, engaged, and excited about pushing the boundaries of the transportation industry to new frontiers and be the first choice of each user.",
    responsibilities: [
      "Conduct user interviews, surveys, and usability testing",
      "Analyze research data and identify patterns and insights",
      "Create user personas and journey maps",
      "Present research findings to product teams",
      "Collaborate with designers and product managers",
      "Stay updated on UX research methods and tools",
    ],
    requirements: [
      "Bachelor's degree in Psychology, Human-Computer Interaction, or related field",
      "0-2 years of experience in user research or related role",
      "Knowledge of user research methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation skills",
      "Empathy for users and passion for improving user experiences",
      "Basic understanding of design principles is a plus",
    ],
    postedDate: "2023-08-10",
    isActive: true,
  },
  {
    id: "4",
    title: "Support Engineer",
    category: "Tech",
    location: "Tehran, Tehran, Iran, Islamic Republic of",
    description:
      "We are looking for a Support Engineer to provide technical assistance to our customers.",
    summary:
      "As a Support Engineer, you will be the first point of contact for technical issues and play a crucial role in ensuring customer satisfaction. You will troubleshoot problems, document solutions, and escalate complex issues to the appropriate teams.",
    about:
      "Our company is the pioneer provider of ride-hailing mobile solutions that connects smartphone owners in need of a ride to drivers who use their private cars offering transportation services. We are ambitious, passionate, engaged, and excited about pushing the boundaries of the transportation industry to new frontiers and be the first choice of each user.",
    responsibilities: [
      "Respond to customer inquiries and provide technical support",
      "Troubleshoot and resolve technical issues",
      "Document solutions and maintain knowledge base",
      "Escalate complex issues to specialized teams",
      "Identify recurring problems and suggest improvements",
      "Participate in on-call rotations for critical issues",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "1-3 years of experience in a technical support role",
      "Strong troubleshooting and problem-solving skills",
      "Knowledge of Linux systems and networking concepts",
      "Excellent communication skills",
      "Ability to work under pressure and handle multiple tasks",
      "Customer-oriented mindset",
      "Fluency in English is required",
    ],
    postedDate: "2023-07-20",
    isActive: true,
  },
];

export const mockApplicants: Applicant[] = [
  {
    id: "1",
    jobId: "1",
    fullName: "Ali Mohammadi",
    email: "ali.mohammadi@example.com",
    phoneNumber: "+98 912 345 6789",
    resumeUrl: "/resumes/ali-mohammadi-resume.pdf",
    coverLetter:
      "I am excited to apply for the General Accountant position as I believe my skills and experience make me a perfect fit for this role.",
    status: "screening",
    appliedDate: "2023-08-05",
    skills: [
      "Accounting",
      "Microsoft Excel",
      "Financial Analysis",
      "ERP Systems",
    ],
    experience: 3,
    matchScore: 85,
  },
  {
    id: "2",
    jobId: "1",
    fullName: "Sara Ahmadi",
    email: "sara.ahmadi@example.com",
    phoneNumber: "+98 912 987 6543",
    resumeUrl: "/resumes/sara-ahmadi-resume.pdf",
    status: "pending",
    appliedDate: "2023-08-07",
    skills: [
      "Financial Reporting",
      "Tax Accounting",
      "QuickBooks",
      "Data Analysis",
    ],
    experience: 2,
    matchScore: 72,
  },
  {
    id: "3",
    jobId: "2",
    fullName: "Mohammad Rezaei",
    email: "mohammad.rezaei@example.com",
    phoneNumber: "+98 935 123 4567",
    resumeUrl: "/resumes/mohammad-rezaei-resume.pdf",
    coverLetter:
      "I am a passionate Golang developer with 4 years of experience in building scalable microservices and APIs.",
    status: "interview",
    appliedDate: "2023-07-20",
    skills: ["Golang", "Microservices", "Docker", "Kubernetes", "PostgreSQL"],
    experience: 4,
    matchScore: 92,
  },
  {
    id: "4",
    jobId: "2",
    fullName: "Zahra Karimi",
    email: "zahra.karimi@example.com",
    phoneNumber: "+98 912 345 9876",
    resumeUrl: "/resumes/zahra-karimi-resume.pdf",
    status: "technical",
    appliedDate: "2023-07-18",
    skills: ["Golang", "RESTful APIs", "MongoDB", "Redis", "Git"],
    experience: 5,
    matchScore: 88,
  },
];

export const mockCompany: Company = {
  name: "TechRide",
  description:
    "TechRide is the fastest-growing startup in Iran and is powered by a young team that wants to take Iran's IT industry to the next level. We are always looking for young talent that wants to make a better tomorrow and have a positive impact on the lifestyle of people. Today we are proud to announce that TechRide is the first and biggest ride-hailing service in Iran with more than 30 million passengers and 2 million drivers in its fleet. We are always expanding the team to reach our ambitious objectives!",
  location: {
    address: "Tehran, Tehran, Iran, Islamic Republic of",
    coordinates: {
      lat: 35.7219,
      lng: 51.3347,
    },
  },
  benefits: [
    {
      id: "1",
      title: "Hybrid Working",
      icon: "office-building",
    },
    {
      id: "2",
      title: "Competitive Salary",
      icon: "currency-dollar",
    },
    {
      id: "3",
      title: "Employee Loan",
      icon: "cash",
    },
    {
      id: "4",
      title: "Time Flexibility",
      icon: "clock",
    },
    {
      id: "5",
      title: "In-House Training Courses",
      icon: "academic-cap",
    },
    {
      id: "6",
      title: "Supplementary Health Insurance",
      icon: "heart",
    },
    {
      id: "7",
      title: "Online/On-site Doctor",
      icon: "user-md",
    },
    {
      id: "8",
      title: "TechRide Credit",
      icon: "credit-card",
    },
    {
      id: "9",
      title: "Internet Allowance",
      icon: "wifi",
    },
  ],
  photos: [
    "/images/office-1.jpg",
    "/images/office-2.jpg",
    "/images/office-3.jpg",
    "/images/office-4.jpg",
  ],
};

export const mockCategoriesCount: Record<JobCategory, number> = {
  All: mockJobs.length,
  Finance: mockJobs.filter((job) => job.category === "Finance").length,
  Tech: mockJobs.filter((job) => job.category === "Tech").length,
  Product: mockJobs.filter((job) => job.category === "Product").length,
  Commercial: mockJobs.filter((job) => job.category === "Commercial").length,
  "Business Development": mockJobs.filter(
    (job) => job.category === "Business Development"
  ).length,
  Marketing: mockJobs.filter((job) => job.category === "Marketing").length,
  Operations: mockJobs.filter((job) => job.category === "Operations").length,
};

export const getJobs = (category?: JobCategory) => {
  if (!category || category === "All") {
    return Promise.resolve(mockJobs);
  }
  return Promise.resolve(mockJobs.filter((job) => job.category === category));
};

export const getJob = (id: string) => {
  const job = mockJobs.find((job) => job.id === id);
  if (!job) {
    return Promise.reject(new Error("Job not found"));
  }
  return Promise.resolve(job);
};

export const getApplicants = (jobId?: string) => {
  if (!jobId) {
    return Promise.resolve(mockApplicants);
  }
  return Promise.resolve(
    mockApplicants.filter((applicant) => applicant.jobId === jobId)
  );
};

export const getApplicant = (id: string) => {
  const applicant = mockApplicants.find((applicant) => applicant.id === id);
  if (!applicant) {
    return Promise.reject(new Error("Applicant not found"));
  }
  return Promise.resolve(applicant);
};

export const getCompanyInfo = () => {
  return Promise.resolve(mockCompany);
};

export const getCategoriesWithCount = () => {
  return Promise.resolve(mockCategoriesCount);
};
