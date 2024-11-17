import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-5 bg-dark">
    <Container>
      <Col className="text-center">
        Department of Information and Computer Sciences
        <br />
        University of Hawaii at Manoa
        <br />
        <a href="https://corponector.github.io/">About Us</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
