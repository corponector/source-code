import { getServerSession } from 'next-auth';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StudentInfo from '@/components/StudentInfo';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';

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
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  );
};

export default StudentPage;
