import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="d-flex align-items-center justify-content-center py-5">
      <Row className="justify-content-center text-center">
        <Col xs={10} md={8} lg={6}>
          <h1>Welcome to Corponector!</h1>
          <p className="py-3">
            Corponector bridges the gap between UH computer science and engineering students and a wide range of
            companies seeking fresh talent. We provide a platform where local and global companies can share potential
            job and internship openings, making it easier for students to explore future career opportunities and
            prepare for them today.
          </p>
          <p>
            Whether you&apos;re a student eager to gain real-world experience or a company looking to connect with
            skilled, motivated individuals, Corponector is here to make the connections happen. Discover tailored
            matches, connect with companies aligned to your skills and interests, and build a meaningful path toward
            your career goals.
          </p>
          <h4>Login or Sign up to join us now!</h4>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
