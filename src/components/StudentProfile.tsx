/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */

'use client';

import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { Student } from './Interface';

interface ProfilePageProps {
  student: Student;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ student }) => (
  <Container fluid className="d-flex justify-content-center align-items-center vh-100">
    <Card className="w-75 h-75" style={{ backgroundColor: 'rgba(999, 999, 999, 0.5)', border: 'none' }}>
      <Card.Body>
        <Row className="h-100">
          <Col md={3} className="d-flex flex-column justify-content-center align-items-center">
            <Image
              src={student.profileImage || '/profile.png'}
              alt={student.name}
              fluid
              onError={(e) => {
                e.currentTarget.src = '/profile.png';
              }}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
            <a href={student.professionalPage} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
              Personal Link
            </a>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1 className="display-4">{student.name}</h1>
            <p className="lead" />
            <strong>About Me:</strong>
            <p>{student.aboutMe}</p>
            <p>
              <strong>Location:</strong>
              {' '}
              {student.location}
            </p>
            <p>
              <strong>Skills:</strong>
              {' '}
              {student.skills.join(', ')}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Container>
);

export default ProfilePage;
