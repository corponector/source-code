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
        {company.emails}
      </Card.Text>
      <Card.Text>
        <strong>Positions:</strong>
      </Card.Text>
      <ul>
        {company.positions.map((position: Position) => (
          <li key={position.id}>
            <strong>{position.title}</strong>
            <p>{position.description}</p>
            <p>
              <strong>Skills:</strong>
              {' '}
              {Array.isArray(position.skills) ? position.skills.join(', ') : position.skills}
            </p>
            <p>
              <strong>Job Type:</strong>
              {' '}
              {position.jobType}
            </p>
            <p>
              <strong>Number of Hires:</strong>
              {' '}
              {position.numberOfHires}
            </p>
            <p>
              <strong>Salary Range:</strong>
              {' '}
              $
              {position.salaryRange}
            </p>
          </li>
        ))}
      </ul>
    </Card.Body>
  </Card>
);

export default CompanyCard;
