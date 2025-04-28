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

interface ApplyFormProps {
  job: Job;
}

interface ApplyFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  resumeFile: FileList;
  photoFile?: FileList;
  coverLetter?: string;
}

export function ApplyForm({ job }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormData>();

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
            Application Submitted!
          </h3>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Thank you for applying to the {job.title} position. We will review
            your application and get back to you soon.
          </p>
          <Button className="mt-6" onClick={() => setIsSuccess(false)}>
            Apply to Another Position
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for this Job</CardTitle>
        <CardDescription>
          Fill out the form below to apply for the {job.title} position.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
            error={errors.fullName?.message}
            required
          />

          <Input
            label="Email Address"
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
            required
          />

          <Input
            label="Phone Number"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            error={errors.phoneNumber?.message}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Resume/CV
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary-500 file:py-2 file:px-4 file:text-sm file:font-medium file:text-white hover:file:bg-primary-600 dark:text-gray-400 dark:file:bg-primary-600 dark:hover:file:bg-primary-500"
              accept=".pdf,.doc,.docx"
              {...register("resumeFile", {
                required: "Resume is required",
              })}
            />
            {errors.resumeFile && (
              <p className="text-sm text-red-500">
                {errors.resumeFile.message}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We accept PDF, DOC, and DOCX files.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo (Optional)
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary-500 file:py-2 file:px-4 file:text-sm file:font-medium file:text-white hover:file:bg-primary-600 dark:text-gray-400 dark:file:bg-primary-600 dark:hover:file:bg-primary-500"
              accept=".jpg,.jpeg,.png"
              {...register("photoFile")}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We accept JPG, JPEG, and PNG files.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="coverLetter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cover Letter (Optional)
            </label>
            <textarea
              id="coverLetter"
              rows={5}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
              placeholder="Tell us why you're a good fit for this position..."
              {...register("coverLetter")}
            ></textarea>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
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
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}