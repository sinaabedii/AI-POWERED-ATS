import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../common/Button";
import { Job, JobCategory } from "../../types/job";

interface JobFormProps {
  job?: Job;
  onSubmit: (job: Omit<Job, "id">) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function JobForm({
  job,
  onSubmit,
  onCancel,
  isSubmitting,
}: JobFormProps) {
  const { user } = useAuth();

  const [title, setTitle] = useState(job?.title || "");
  const [category, setCategory] = useState<JobCategory>(
    job?.category || "Tech"
  );
  const [location, setLocation] = useState(job?.location || "");
  const [description, setDescription] = useState(job?.description || "");
  const [summary, setSummary] = useState(job?.summary || "");
  const [about, setAbout] = useState(job?.about || ""); // Add state for 'about' field
  const [responsibilities, setResponsibilities] = useState<string[]>(
    job?.responsibilities || [""]
  );
  const [requirements, setRequirements] = useState<string[]>(
    job?.requirements || [""]
  );
  const [isActive, setIsActive] = useState(job?.isActive ?? true);

  const categories: JobCategory[] = [
    "Finance",
    "Tech",
    "Product",
    "Commercial",
    "Business Development",
    "Marketing",
    "Operations",
  ];

  const handleAddResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const handleRemoveResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      const newResponsibilities = [...responsibilities];
      newResponsibilities.splice(index, 1);
      setResponsibilities(newResponsibilities);
    }
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRemoveRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = [...requirements];
      newRequirements.splice(index, 1);
      setRequirements(newRequirements);
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const jobData: Omit<Job, "id"> = {
      title,
      category,
      location,
      description,
      summary,
      about, // Include the about field
      responsibilities: responsibilities.filter((r) => r.trim() !== ""),
      requirements: requirements.filter((r) => r.trim() !== ""),
      postedDate: job?.postedDate || new Date().toISOString().split("T")[0],
      isActive,
      createdBy: job?.createdBy || user.id,
    };

    await onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value as JobCategory)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Location <span className="text-red-500">*</span>
        </label>
        <input
          id="location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Detailed Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          id="summary"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Add About Company field */}
      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          About Company <span className="text-red-500">*</span>
        </label>
        <textarea
          id="about"
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={5}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Responsibilities <span className="text-red-500">*</span>
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddResponsibility}
          >
            Add
          </Button>
        </div>

        {responsibilities.map((responsibility, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              required
              value={responsibility}
              onChange={(e) =>
                handleResponsibilityChange(index, e.target.value)
              }
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemoveResponsibility(index)}
              disabled={responsibilities.length <= 1}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Requirements <span className="text-red-500">*</span>
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddRequirement}
          >
            Add
          </Button>
        </div>

        {requirements.map((requirement, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              required
              value={requirement}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemoveRequirement(index)}
              disabled={requirements.length <= 1}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          id="isActive"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label
          htmlFor="isActive"
          className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
        >
          Active job posting
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : job ? "Update Job" : "Create Job"}
        </Button>
      </div>
    </form>
  );
}