import { getServerSession } from 'next-auth';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
import CompanyInfo from '@/components/CompanyInfo';
import StudentCard from '@/components/StudentCard';
import CompanyPositions from '@/components/CompanyPositions';
import { Student } from '@/components/Interface';

const getRandomStudents = (students: any[], num: number) => {
  const shuffled = students.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const CompanyPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const userEmail = session?.user?.email;

  const company = await prisma.company.findFirst({
    where: {
      owner: userEmail || '',
    },
    include: {
      positions: true,
    },
  });

  if (!company) {
    return (
      <main className="semi-transparent">
        <Container className="py-3">
          <h1>No company found for the current user.</h1>
        </Container>
      </main>
    );
  }

  const students = await prisma.student.findMany();
  const recommendedStudents = getRandomStudents(students, company.positions.length);

  return (
    <main className="semi-transparent">
      <Container className="py-3">
        <Row>
          <Col xs={12} md={8}>
            <CompanyInfo {...company} />
          </Col>
          <Col xs={12} md={4}>
            <h1>Recommended Students</h1>
            {recommendedStudents.map((student: Student) => (
              <Container key={student.id} fluid>
                <StudentCard student={student} />
              </Container>
            ))}
          </Col>
        </Row>
        <CompanyPositions positions={company.positions} />
        <Container>
          <Button className="my-5">
            <Link href={`/company/edit/${company.id}`} style={{ color: 'white' }}>
              Edit
            </Link>
          </Button>
        </Container>
      </Container>
    </main>
  );
};

export default CompanyPage;
