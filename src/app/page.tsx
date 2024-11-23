import { Col, Container, Row, Button } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    {/* Welcome Section */}
    <section id="welcome-section" className="custom-welcome-section d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={10} md={8} lg={6}>
            <h1 style={{ fontFamily: "'Spicy Rice', cursive", fontSize: '4rem' }}>
              <strong>Welcome to Corponector!</strong>
            </h1>
          </Col>
        </Row>
      </Container>
    </section>

    {/* About Us Section */}
    <section id="about-us-section" className="bg-light py-3">
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={10} md={8} lg={6}>
            <h2 className="py-3" style={{ fontFamily: "'Spicy Rice', cursive", fontSize: '3rem' }}>
              About Us
            </h2>
            <p>
              Corponector is dedicated to fostering connections between talented students and forward-thinking
              companies. Our mission is to provide a platform that simplifies the process of finding opportunities,
              networking with industry professionals, and building successful careers.
            </p>
            <p>
              Created with a vision to empower students and companies alike, Corponector continues to grow as a hub for
              innovation, collaboration, and success. Join us on our journey to shape the future of talent and
              opportunity.
            </p>
          </Col>
        </Row>
      </Container>
      <hr />
    </section>
    {/* Get Started Section */}
    <section id="get-started-section" className="bg-light" style={{ paddingBottom: '50px' }}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={10} md={8} lg={6}>
            <h2 style={{ fontFamily: "'Spicy Rice', cursive", fontSize: '3rem' }}>Get Started</h2>
            <p className="py-3">
              Just log in or signup to get started using Corponector. Fill out your email, password, and additional
              information to create your account. Click on &apos;Join Now&apos; to begin exploring the platform and
              connecting.
            </p>
            <Button href="/auth/signup" variant="primary" size="lg">
              Join Now
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  </main>
);

export default Home;
