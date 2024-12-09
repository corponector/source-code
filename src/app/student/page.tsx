import { getServerSession } from 'next-auth';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
// import { Company } from '@prisma/client';
import { Company } from '@/components/Interface';
import StudentInfo from '@/components/StudentInfo';
import CompanyCard from '@/components/CompanyCard';

const StudentPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const students = await prisma.student.findMany({
    where: {
      owner,
    },
  });
  const companies = await prisma.company.findMany({
    include: {
      positions: true,
    },
  });
  return (
    <main className="semi-transparent">
      <Container className="py-3">
        {students.map((student) => (
          <Row key={student.id}>
            <Col xs>
              <StudentInfo {...student} />
              <Container>
                <Button className="my-5">
                  <Link href={`/student/edit/${student.id}`} style={{ color: 'white' }}>Edit</Link>
                </Button>
              </Container>
            </Col>
            <Col>
              <h1>Recommended Companies</h1>
              {companies.map((company: Company) => (
                <Container key={company.id} fluid>
                  <CompanyCard company={company} />
                </Container>
              ))}
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  );
};

export default StudentPage;
