/* eslint-disable react/no-array-index-key */

'use client';

import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { Student } from './Interface';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => (
  <Card className="mb-3" style={{ backgroundColor: 'silver' }}>
    <Card.Body>
      <Row>
        <Col md={4}>
          <Image
            src={student.profileImage || 'profile.png'}
            alt={student.name}
            fluid
            onError={(e) => {
              e.currentTarget.src = 'profile.png';
            }}
            style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
          />
        </Col>
        <Col md={8}>
          <Card.Title>{student.name}</Card.Title>
          <Card.Text>
            <strong>Location:</strong>
            {' '}
            {student.location}
          </Card.Text>
          <Card.Text>
            <strong>Skills:</strong>
          </Card.Text>
          <ul>
            {student.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <Card.Link href={student.professionalPage} target="_blank">
            Professional Page
          </Card.Link>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default StudentCard;
