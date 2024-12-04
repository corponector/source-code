/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */

'use client';

import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { Student } from './Interface';

interface ProfilePageProps {
  student: Student;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ student }) => (
  <Container>
    <Row className="mb-3">
      <Col md={4}>
        <Image
          src={student.profileImage || '/profile.png'}
          alt={student.name}
          fluid
          onError={(e) => {
            e.currentTarget.src = '/profile.png';
          }}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Col>
      <Col md={8}>
        <h1>{student.name}</h1>
        <p>
          <strong>Location:</strong>
          {' '}
          {student.location}
        </p>
        <p>
          <strong>Skills:</strong>
        </p>
        <ul>
          {student.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <a href={student.professionalPage} target="_blank" rel="noopener noreferrer">
          Professional Page
        </a>
      </Col>
    </Row>
  </Container>
);

export default ProfilePage;
