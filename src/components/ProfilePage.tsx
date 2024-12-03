/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */

'use client';

import React, { useEffect, useState } from 'react';
import { Card, Image, Row, Col, Spinner } from 'react-bootstrap';
import { Student } from './Interface';

interface ProfilePageProps {
  id: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ id }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log(`Fetching student data for ID: ${id}`);
      fetch(`/api/students/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Student not found');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Student data:', data);
          setStudent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
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
};

export default ProfilePage;
