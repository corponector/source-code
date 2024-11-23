'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import { Company, Position } from './Interface';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => (
  <Card className="mb-3">
    <Card.Body>
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
        {company.emails.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Positions:</strong>
      </Card.Text>
      <ul>
        {company.positions.map((position: Position) => (
          <li key={position.id}>
            <strong>{position.title}</strong>
            {' '}
            -
            {position.tagTitle}
          </li>
        ))}
      </ul>
    </Card.Body>
  </Card>
);

export default CompanyCard;
