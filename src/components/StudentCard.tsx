'use client';

import React from 'react';
import { Card } from 'react-bootstrap';

interface StudentCardProps {
  student: {
    name: string;
    skills: string[];
    professionalPage: string;
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>{student.name}</Card.Title>
      <Card.Text>
        <strong>Skills:</strong>
        {' '}
        {student.skills.join(', ')}
      </Card.Text>
      <Card.Link href={student.professionalPage} target="_blank">
        Professional Page
      </Card.Link>
    </Card.Body>
  </Card>
);

export default StudentCard;
