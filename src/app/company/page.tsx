import { Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import CandidateProfile from '@/components/CandidateProfile';
import JobListing from '@/components/JobListing';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Company, Position } from '@prisma/client';

const CompanyPage = async ({ params }: { params: { id: string | string[] } }) => {
  // Protect the page, only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Ensure the companyId is correctly parsed as a number
  const companyId = Array.isArray(params?.id) ? Number(params?.id[0]) : Number(params?.id);

  // Check if companyId is valid
  if (isNaN(companyId) || companyId <= 0) {
    return <div>Invalid company ID</div>;
  }

  // Fetch company data from the database
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { positions: true }, // Include positions (jobs) for this company
  });

  // Handle case where the company doesn't exist
  if (!company) {
    return <div>Company not found</div>;
  }

  // Fetch job listings and candidates (just as an example, modify as per your requirements)
  const jobs = company.positions;

  // Example candidates data (this can be fetched from the database as well)
  const candidates = [
    { id: 1, name: 'John Doe', skills: ['JavaScript', 'React', 'Node.js'], location: 'San Francisco' },
    { id: 2, name: 'Jane Smith', skills: ['Python', 'Django'], location: 'New York' },
  ];

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Container fluid className="py-5 text-center">
            <Row className="d-flex align-items-center">
              <Col xs={12} md={6}>
                <h1>
                  Welcome to
                  {company.name}
                </h1>
                <p>{company.overview}</p>
                <p>Find top talent, post job openings, and manage your team.</p>

                {/* Edit Button */}
                <Button className="my-5">
                  <Link href={`/company/edit/${company.id}`} passHref>
                    <Button variant="link" style={{ color: 'white' }}>
                      Edit Company Info
                    </Button>
                  </Link>
                </Button>
              </Col>
              <Col xs={12} md={6} className="d-flex justify-content-center">
                <Image src="/google.jpeg" width={300} height={300} alt="Google Company Logo" />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Job Listings Section */}
        <section className={styles.jobListings}>
          <Container className="py-5">
            <h2>Job Openings</h2>
            <Row>
              {jobs.map((job) => (
                <Col key={job.id} sm={12} md={6} lg={4}>
                  <JobListing job={job} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Candidate Profiles Section */}
        <section className={styles.candidateProfiles}>
          <Container className="py-5">
            <h2>Candidate Profiles</h2>
            <Row>
              {candidates.map((candidate) => (
                <Col key={candidate.id} sm={12} md={6} lg={4}>
                  <CandidateProfile candidate={candidate} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default CompanyPage;
