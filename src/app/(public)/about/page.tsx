import { getCompanyInfo } from '@/lib/data';

export const metadata = {
  title: 'About Us | ATS System',
  description: 'Learn more about our company and culture',
};

export default function AboutPage() {
  const company = getCompanyInfo();

  return (
    <div className="container-custom mx-auto py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">About Us</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{company.description}</p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Our mission is to simplify recruitment and help companies find the best talent while
        providing an excellent candidate experience.
      </p>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Our Benefits</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {company.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="rounded-lg bg-white p-4 shadow dark:bg-gray-800"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{benefit.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Our Location</h2>
        <p className="text-gray-700 dark:text-gray-300">{company.location.address}</p>
      </div>
    </div>
  );
}
