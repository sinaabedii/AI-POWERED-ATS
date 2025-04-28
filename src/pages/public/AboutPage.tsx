import { PageLayout } from '../../components/layout/PageLayout';

export function AboutPage() {
  return (
    <PageLayout>
      <div className="container-custom mx-auto py-12">
        <h1 className="mb-6 text-3xl font-bold">About Us</h1>
        <p className="mb-4">
          Welcome to our Applicant Tracking System. We are a leading company dedicated
          to helping businesses streamline their hiring process through innovative technology.
        </p>
        <p className="mb-4">
          Our mission is to simplify recruitment and help companies find the best talent
          while providing an excellent candidate experience.
        </p>
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Our Team</h2>
          <p>
            Our team consists of experienced professionals in HR technology, dedicated
            to creating the best applicant tracking system on the market.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}