import { Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import CandidateProfile from '@/components/CandidateProfile';
import JobListing from '@/components/JobListing';
import styles from '@/styles/Home.module.css';
import Link from 'next/link'; // Corrected import for Next.js Link component
import { Company } from '@prisma/client';

/** The Company Homepage. */
const CompanyPage = () => {
  // Example company data
  const company: Company = {
    id: 1,
    name: 'XYZ Corp',
    location: 'San Francisco, CA',
    overview: 'A leading tech company in AI.',
    links: ['https://xyz-corp.com'],
    emails: ['contact@xyz-corp.com'],
    profileImage: '/company-logo.png',
    owner: 'John Doe',
  };

  // Example job postings and candidate profiles
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      location: 'San Francisco',
      description: 'Develop and maintain web applications.',
      salary: '$120,000 - $140,000',
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'New York',
      description: 'Oversee product development and lead cross-functional teams.',
      salary: '$110,000 - $130,000',
    },
  ];

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
                <h1>Welcome to Google</h1>
                <p>
                  Google is an American-based multinational corporation and technology company focusing on online
                  advertising, search engine technology, cloud computing, computer software, quantum computing,
                  e-commerce, consumer electronics, and artificial intelligence (AI)
                </p>
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
                <Image src="/google.png" width={300} height={300} alt="Google Company Logo" />
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
