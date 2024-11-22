'use client';

import React from 'react';
import { Card } from 'react-bootstrap';

interface Position {
  title: string;
  description: string;
}

interface CompanyCardProps {
  company: {
    name: string;
    overview: string;
    location: string;
    positions: Position[];
    links: string[];
    emails: string[];
  };
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
        <strong>Positions:</strong>
        <ul>
          {company.positions.map((position, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <strong>
                {position.title}
                :
              </strong>
              {' '}
              {position.description}
            </li>
          ))}
        </ul>
      </Card.Text>
      {company.links.map((link, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card.Link href={link} target="_blank" key={index}>
          {link}
        </Card.Link>
      ))}
    </Card.Body>
  </Card>
);

export default CompanyCard;
