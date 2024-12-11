/* eslint-disable max-len */

'use client';

import { Container, Card, Image } from 'react-bootstrap';
import { Company } from '@/components/Interface';

const CompanyInfo = ({
  name, profileImage, overview, location, emails, links }: Company) => (
    <Container className="justify-content-center h-100">
      <Card className="mb-3 h-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid #ddd' }}>
        <Card.Body className="d-flex flex-column">
          <Image
            src={profileImage || '/default-company.svg'}
            alt={name}
            roundedCircle
            className="d-block mx-auto mb-3"
            style={{ width: '150px' }}
            onError={(e) => {
              e.currentTarget.src = '/default-company.svg';
            }}
          />
          <Card.Title className="text-center">{name}</Card.Title>
          <div className="mt-4">
            <strong>Overview</strong>
            <div className="fs-6"><span style={{ marginLeft: '0.5rem' }}>{overview}</span></div>
          </div>

          <div className="mt-3">
            <strong>Location</strong>
            <div className="fs-6"><span style={{ marginLeft: '0.5rem' }}>{location}</span></div>
          </div>

          <div className="mt-3">
            <strong>Links</strong>
            <div className="fs-6"><span style={{ marginLeft: '0.5rem' }}>{Array.isArray(links) ? links.join(', ') : links}</span></div>
          </div>
          <div className="mt-3">
            <strong>Emails</strong>
            <div className="fs-6"><span style={{ marginLeft: '0.5rem' }}>{Array.isArray(emails) ? emails.join(', ') : emails}</span></div>
          </div>
        </Card.Body>
      </Card>
    </Container>
);

export default CompanyInfo;
