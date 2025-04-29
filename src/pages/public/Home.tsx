import { Link } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { Button } from "../../components/common/Button";
import { useEffect, useState } from "react";
import { getJobs, getCompanyInfo } from "../../services/mockData";
import { Company } from "../../types/company";
import { Job } from "../../types/job";
import { JobCard } from "../../components/jobs/JobCard";

export function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [jobsData, companyData] = await Promise.all([
          getJobs(),
          getCompanyInfo(),
        ]);

        setFeaturedJobs(jobsData.slice(0, 3));
        setCompany(companyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
        </div>

        <div className="relative container-custom mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Find Your Dream Job
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300">
            Join our team and be part of building the future of transportation
          </p>
          <div className="mx-auto mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/jobs" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">Browse Open Positions</Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto mt-3 sm:mt-0">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base border-gray-300 text-white hover:bg-gray-800"
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="container-custom mx-auto">
          <div className="mb-6 sm:mb-10 flex flex-col items-center text-center sm:text-left sm:flex-row sm:justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Jobs
            </h2>
            <Link
              to="/jobs"
              className="mt-2 sm:mt-0 text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 text-sm sm:text-base"
            >
              View all positions →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex h-40 sm:h-64 items-center justify-center">
              <div className="text-center">
                <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent mx-auto"></div>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Loading jobs...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Company Section */}
      <section className="bg-gray-50 py-10 sm:py-16 px-4 sm:px-6 dark:bg-gray-800">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                About Our Company
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                {company?.description || "Loading..."}
              </p>
              <div className="mt-6 sm:mt-8">
                <Link to="/about">
                  <Button className="text-sm sm:text-base">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 mt-6 lg:mt-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Perks & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {company?.benefits.slice(0, 6).map((benefit) => (
                  <div
                    key={benefit.id}
                    className="flex items-center rounded-md bg-white p-3 sm:p-4 shadow-sm dark:bg-gray-700"
                  >
                    <div className="mr-2 sm:mr-3 text-primary-500 dark:text-primary-400">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                      {benefit.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="container-custom mx-auto rounded-xl bg-primary-600 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 dark:bg-primary-700">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Ready to Join Our Team?
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-primary-100">
              We're always looking for talented people to join our fast-growing
              company.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link to="/jobs" className="inline-block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base bg-white text-primary-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  Browse Open Positions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}