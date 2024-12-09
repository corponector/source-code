/* eslint-disable max-len */

'use client';

import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { Company } from './Interface';

interface CompanyProfileProps {
  company: Company;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company }) => (
  <Container fluid className="d-flex justify-content-center align-items-center vh-100">
    <Card className="w-75 h-75" style={{ backgroundColor: 'rgba(999, 999, 999, 0.5)', border: 'none' }}>
      <Card.Body>
        <Row className="h-100">
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
          <Col md={6} className="d-flex flex-column justify-content-center">
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
          <Col md={3} className="d-flex flex-column justify-content-center">
            <h3 className="display-7">Open Positions:</h3>
            <ul className="list-unstyled">
              {company.positions.map((position) => (
                <li key={position.id} className="mb-3">
                  <strong>
                    •
                    {' '}
                    {position.title}
                  </strong>
                  <p>{position.description}</p>
                  <p>
                    <strong>
                      -
                      Skills:
                    </strong>
                    {' '}
                    {Array.isArray(position.skills) ? position.skills.join(', ') : position.skills}
                  </p>
                  <p>
                    <strong>
                      -
                      Job Type:
                    </strong>
                    {' '}
                    {Array.isArray(position.jobType) ? position.jobType.join(', ') : position.jobType}
                  </p>
                  <p>
                    <strong> - Number of Hires:</strong>
                    {' '}
                    {position.numberOfHires}
                  </p>
                  <p>
                    <strong> - Salary Range:</strong>
                    {' '}
                    $
                    {position.salaryRange}
                  </p>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Container>
);

export default CompanyProfile;
