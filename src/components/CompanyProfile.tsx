/* eslint-disable max-len */

'use client';

import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { Company } from './Interface';
import CompanyPositions from './CompanyPositions';

interface CompanyProfileProps {
  company: Company;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company }) => (
  <Container fluid className="d-flex justify-content-center align-items-center vh-100">
    <Card className="w-75" style={{ backgroundColor: 'rgba(999, 999, 999, 0.5)', border: 'none' }}>
      <Card.Body>
        <Row>
          <Col md={3} className="d-flex flex-column justify-content-center align-items-center">
            <Image
              src={company.profileImage || '/default-company.svg'}
              alt={company.name}
              fluid
              onError={(e) => {
                e.currentTarget.src = '/default-company.svg';
              }}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
            <a href={Array.isArray(company.links) ? company.links[0] : company.links} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
              Apply Now on Our Website!
            </a>
          </Col>
          <Col md={9} className="d-flex flex-column justify-content-center">
            <h1 className="display-4">{company.name}</h1>
            <p>
              <strong>Location:</strong>
              {' '}
              {company.location}
            </p>
            <p>
              <strong>Overview:</strong>
              {' '}
              {company.overview}
            </p>
            <p>
              <strong>Emails:</strong>
              {' '}
              {Array.isArray(company.emails) ? company.emails.join(', ') : company.emails}
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <CompanyPositions positions={company.positions} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Container>
);

export default CompanyProfile;
