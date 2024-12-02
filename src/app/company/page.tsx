import { Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import CandidateProfile from '@/components/CandidateProfile';
import JobListing from '@/components/JobListing';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';

/** The Company Homepage. */
const CompanyPage = () => {
  // Example data for job postings and candidates
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      location: 'San Francisco',
      description: 'Develop and maintain web applications.',
      salary: '$120,000 - $140,000', // Add salary field
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'New York',
      description: 'Oversee product development and lead cross-functional teams.',
      salary: '$110,000 - $130,000', // Add salary field
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
            <Row>
              <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                <h1>Welcome to Our Company</h1>
                <p>Find top talent, post job openings, and manage your team.</p>
                <Button variant="primary" size="lg" className="mt-3">
                  Post a Job
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Image src="/company-logo.png" width={300} height={300} alt="Company Logo" />
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
