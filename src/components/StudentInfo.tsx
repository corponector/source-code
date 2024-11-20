import { Card } from 'react-bootstrap';
import { Student } from '@prisma/client';
import Link from 'next/link';

const StudentInfo = ({ id, name, skills, professionalPage } : Student) => (
  <Card>
    <Card.Header>
      <Card.Title>{name}</Card.Title>
      <Link href={`/edit/${id}`}>Edit</Link>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {skills}
      </Card.Text>
      <Card.Link href={professionalPage}>Professional Page</Card.Link>
    </Card.Body>
  </Card>
);

export default StudentInfo;
