import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../common/Card";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Job } from "../../types/job";

interface JobFormProps {
  job?: Job;
  onSubmit: (data: Partial<Job>) => void;
  isSubmitting: boolean;
}

export function JobForm({ job, onSubmit, isSubmitting }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Job>>({
    defaultValues: job || {
      title: "",
      category: "Tech",
      location: "",
      description: "",
      summary: "",
      about: "",
      responsibilities: [""],
      requirements: [""],
      isActive: true,
    },
  });

  const [responsibilities, setResponsibilities] = useState<string[]>(
    job?.responsibilities || [""]
  );

  const [requirements, setRequirements] = useState<string[]>(
    job?.requirements || [""]
  );

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      const newResponsibilities = [...responsibilities];
      newResponsibilities.splice(index, 1);
      setResponsibilities(newResponsibilities);
    }
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = [...requirements];
      newRequirements.splice(index, 1);
      setRequirements(newRequirements);
    }
  };

  const handleFormSubmit = (data: Partial<Job>) => {
    const formData = {
      ...data,
      responsibilities,
      requirements,
    };

    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{job ? "Edit Job" : "Create Job"}</CardTitle>
        <CardDescription>
          {job
            ? "Update the job details below"
            : "Fill out the form below to create a new job posting"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <Input
            label="Job Title"
            id="title"
            {...register("title", { required: "Job title is required" })}
            error={errors.title?.message}
            required
          />

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="category"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              {...register("category", { required: "Category is required" })}
            >
              <option value="Finance">Finance</option>
              <option value="Tech">Tech</option>
              <option value="Product">Product</option>
              <option value="Commercial">Commercial</option>
              <option value="Business Development">Business Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <Input
            label="Location"
            id="location"
            {...register("location", { required: "Location is required" })}
            error={errors.location?.message}
            required
          />

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Short Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="description"
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Brief description of the job..."
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Job Summary
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="summary"
              rows={5}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Detailed summary of the job..."
              {...register("summary", { required: "Summary is required" })}
            ></textarea>
            {errors.summary && (
              <p className="text-sm text-red-500">{errors.summary.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              About Company
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="about"
              rows={5}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Information about the company..."
              {...register("about", { required: "About is required" })}
            ></textarea>
            {errors.about && (
              <p className="text-sm text-red-500">{errors.about.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Responsibilities
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addResponsibility}
              >
                Add
              </Button>
            </div>
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={responsibility}
                  onChange={(e) => {
                    const newResponsibilities = [...responsibilities];
                    newResponsibilities[index] = e.target.value;
                    setResponsibilities(newResponsibilities);
                  }}
                  placeholder={`Responsibility ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeResponsibility(index)}
                  disabled={responsibilities.length <= 1}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Requirements
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRequirement}
              >
                Add
              </Button>
            </div>
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={requirement}
                  onChange={(e) => {
                    const newRequirements = [...requirements];
                    newRequirements[index] = e.target.value;
                    setRequirements(newRequirements);
                  }}
                  placeholder={`Requirement ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRequirement(index)}
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
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              {...register("isActive")}
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Active Job Posting
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : job ? (
                "Update Job"
              ) : (
                "Create Job"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
