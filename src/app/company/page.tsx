import { getServerSession } from 'next-auth';
import { Container, Col, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StudentCard from '@/components/StudentCard';
import CompanyCard from '@/components/CompanyCard';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const CompanyPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const companies = await prisma.company.findMany({
    where: {
      owner,
    },
    include: {
      positions: true,
    },
  });

  // Fetch students
  const students = await prisma.student.findMany();

  return (
    <main className="semi-transparent">
      <Container className="py-3">
        {companies.map((company) => (
          <Row key={company.id}>
            <Col xs>
              <CompanyCard company={company} />
            </Col>
            <Col xs>
              <h1>Recommended Students</h1>
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  );
};

export default CompanyPage;
