'use client';

import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { Company, Position } from './Interface';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => (
  <Link href={`/company/profile/${company.id}`} style={{ textDecoration: 'none' }} passHref>
    <Card className="mb-3" style={{ backgroundColor: 'rgba(999, 999, 999, 0.5)', border: 'none', cursor: 'pointer' }}>
      <Card.Body>
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Image
              src={company.profileImage || 'default-company.svg'}
              alt={company.name}
              fluid
              onError={(e) => {
                e.currentTarget.src = 'default-company.svg';
              }}
              style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'contain' }}
            />
          </Col>
          <Col md={8}>
            <Card.Title>{company.name}</Card.Title>
            <Card.Text>
              <strong>Overview:</strong>
              {' '}
              {company.overview}
            </Card.Text>
            <Card.Text>
              <strong>Location:</strong>
              {' '}
              {company.location}
            </Card.Text>
            <Card.Text>
              <strong>Emails:</strong>
              {' '}
              {Array.isArray(company.emails) ? company.emails.join(', ') : company.emails}
            </Card.Text>
            <Card.Text>
              <strong>Positions:</strong>
            </Card.Text>
            <ul>
              {company.positions.map((position: Position) => (
                <li key={position.id}>
                  <strong>{position.title}</strong>
                  <p>{position.description}</p>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Link>
);

export default CompanyCard;
