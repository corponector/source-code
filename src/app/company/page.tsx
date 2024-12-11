import { getServerSession } from 'next-auth';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
import { Student } from '@/components/Interface';
import StudentCard from '@/components/StudentCard';
import CompanyInfo from '@/components/CompanyInfo';
import CompanyPositions from '@/components/CompanyPositions';

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

const CompanyPage = async () => {
  try {
    // Protect the page, only logged-in users can access it.
    const session = await getServerSession(authOptions);
    loggedInProtectedPage(session as { user: { email: string; id: string; randomKey: string } } | null);

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
    const recommendedStudents = shuffleArray(students).slice(0, 3);

    return (
      <main className="semi-transparent">
        <Container className="py-3">
          <Row>
            <Col xs={12} md={8}>
              <CompanyInfo {...company} />
            </Col>
            <Col xs={12} md={4}>
              <h1>Recommended Students</h1>
              {recommendedStudents.length === 0 ? (
                <p>No students available for recommendations.</p>
              ) : (
                recommendedStudents.map((student: Student) => (
                  <Container key={student.id} fluid>
                    <StudentCard student={student} />
                  </Container>
                ))
              )}
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
  } catch (error) {
    console.error('Error loading company page:', error);
    return (
      <main className="semi-transparent">
        <Container className="py-3">
          <h1>Error loading the page. Please try again later.</h1>
        </Container>
      </main>
    );
  }
};

export default CompanyPage;
