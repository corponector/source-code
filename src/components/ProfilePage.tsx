/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Image, Row, Col, Spinner } from 'react-bootstrap';
import { Student } from './Interface';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/students/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setStudent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
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
