export type JobCategory =
  | "All"
  | "Finance"
  | "Tech"
  | "Product"
  | "Commercial"
  | "Business Development"
  | "Marketing"
  | "Operations";

export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  description: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  about: string;
  isActive: boolean;
  createdBy: string;
}
