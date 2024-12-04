'use client';

import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Student } from '@prisma/client';
import SkillItem from '@/components/SkillItem';

const StudentInfo = ({ name, skills, location, professionalPage, profileImage }: Student) => (
  <Container className="justify-content-center">

    <Row>
      <Image src={profileImage} roundedCircle className="px-2" />
      <h1 className="my-2">{name}</h1>
    </Row>

    <Button variant="primary"><a href={professionalPage} className="white-text">Professional Page</a></Button>

    <h3 className="mt-3">
      Preferred Location:
      <span style={{ marginLeft: '0.5rem' }}>{location}</span>
    </h3>

    <h3 className="mt-3">Skills</h3>

    <Row xs={1} md={2} lg={4} className="g-4">
      {skills.map((skill: string) => (
        <Col>
          <SkillItem skill={skill} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default StudentInfo;
