import { Col, Container, Row, Button } from 'react-bootstrap';
import { Share, Eye } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    {/* Welcome Section */}
    <section id="welcome-section" className="custom-welcome-section d-flex align-items-center justify-content-center">
      <Container fluid className="px-0">
        <Row className="justify-content-center text-center">
          <Col xs={10} md={8} lg={6}>
            <h1 style={{ fontFamily: "'Spicy Rice', cursive", fontSize: '6rem' }}>
              <strong>Corponector</strong>
            </h1>
            <h4 className="py-5" style={{ fontFamily: "'Jaro', open-sans", fontSize: '2rem' }}>
              Your platform for connecting with companies and students
            </h4>
          </Col>
        </Row>
      </Container>
    </section>

    {/* About Us Section */}
    <section id="about-us-section" className="bg-light py-3">
      <Container fluid className="px-0">
        {/* Centered Heading */}
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            <h2 className="py-3" style={{ fontFamily: "'Jaro', open-sans", fontSize: '3rem' }}>
              About Us
            </h2>
          </Col>
        </Row>
        {}
        <Row className="justify-content-center">
          <Col className="d-flex flex-column align-items-center px-5" xs={12} md={6}>
            <Share size={100} />
            <div className="description-box">
              <p className="py-5 text-center">
                Corponector is dedicated to creating connections between talented students and forward-thinking
                companies. Our mission is to provide a platform that simplifies the process of finding opportunities,
                networking with industry professionals, and building successful careers.
              </p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center px-5" xs={12} md={6}>
            <Eye size={100} />
            <div className="description-box">
              <p className="py-5 text-center">
                Created with a vision to empower students and companies alike, Corponector continues to grow as a hub
                for innovation, collaboration, and success. Join us on our journey to shape the future of talent and
                opportunity.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/* Get Started Section */}
    <section id="get-started-section" className="bg-light" style={{ padding: '50px' }}>
      <hr />
      <Container fluid className="px-0">
        <Row className="justify-content-center text-center">
          <Col xs={10} md={8} lg={6}>
            <h2 style={{ fontFamily: "'Jaro', open-sans", fontSize: '3rem' }}>Get Started</h2>
            <p className="py-3">
              Just log in or signup to get started using Corponector. Fill out your email, password, and additional
              information to create your account. Click on the button below to begin exploring the platform and
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
