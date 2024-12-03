import { getServerSession } from 'next-auth';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import ProfilePage from '@/components/ProfilePage';

const StudentProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Handle unauthenticated state
    return (
      <main className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} className="text-center">
              <h1>
                Please
                {' '}
                <Link href="/auth/signin">sign in</Link>
                {' '}
                or
                {' '}
                <Link href="/auth/signup">sign up</Link>
                {' '}
                to view student profiles
              </h1>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }

  return <ProfilePage />;
};

export default StudentProfilePage;
