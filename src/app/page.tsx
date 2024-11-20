<<<<<<< HEAD
import { Col, Container, Row } from 'react-bootstrap';
=======
import { Col, Container, Image, Row } from 'react-bootstrap';
>>>>>>> parent of 5973a63 (add)

/** The Home page. */
const Home = () => (
  <main>
<<<<<<< HEAD
    <Container id="landing-page" fluid className="d-flex align-items-center justify-content-center py-5">
      <Row className="justify-content-center text-center">
        <Col xs={10} md={8} lg={6}>
          <h1 style={{ fontFamily: "'Spicy Rice', cursive" }}>
            <strong>Welcome to Corponector!</strong>
          </h1>
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
          <h4>
            <strong>
              <a href="/auth/signin">Login </a>
              or
              <a href="/auth/signup"> Sign up </a>
              to join us now!
            </strong>
          </h4>
=======
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image src="next.svg" width="150px" alt="" />
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
>>>>>>> parent of 5973a63 (add)
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
