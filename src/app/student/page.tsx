import { getServerSession } from 'next-auth';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StudentInfo from '@/components/StudentInfo';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
// import CompanyCard from '@/components/CompanyCard';

const StudentPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const student = await prisma.student.findMany({
    where: {
      owner,
    },
  });
  const companies = await prisma.company.findMany();
  return (
    <main className="semi-transparent">
      <Container className="py-3">
        {student.map((s) => (
          <Row>
            <Col xs>
              <StudentInfo key={s.id} {...s} />
              <Container>
                <Button className="my-5">
                  <Link href={`/student/edit/${s.id}`} style={{ color: 'white' }}>Edit</Link>
                </Button>
              </Container>
            </Col>
            <Col md>
              <h1>Recommended Companies</h1>
              {companies.map((company) => (
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{company.name}</Card.Title>
                    <Card.Text>
                      <strong>Overview:</strong>
                      {' '}
                      {company.overview}
                    </Card.Text>
                    <Card.Text>
                      <strong>Location:</strong>
                      {' '}
                      {company.location}
                    </Card.Text>
                    <Card.Text>
                      <strong>Emails:</strong>
                      {' '}
                      {company.emails}
                    </Card.Text>
                    {/* <Card.Text>
                      <strong>Positions:</strong>
                    </Card.Text>
                    <ul>
                      {company.positions.map((position: Position) => (
                        <li key={position.id}>
                          <strong>{position.title}</strong>
                          <p>{position.description}</p>
                          <p>
                            <strong>Skills:</strong>
                            {' '}
                            {Array.isArray(position.skills) ? position.skills.join(', ') : position.skills}
                          </p>
                          <p>
                            <strong>Job Type:</strong>
                            {' '}
                            {position.jobType}
                          </p>
                          <p>
                            <strong>Number of Hires:</strong>
                            {' '}
                            {position.numberOfHires}
                          </p>
                          <p>
                            <strong>Salary Range:</strong>
                            {' '}
                            $
                            {position.salaryRange}
                          </p>
                        </li>
                      ))}
                    </ul> */}
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  );
};

export default StudentPage;
