import { Stuff } from '@prisma/client';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const StuffItem = ({ name, skills, professionalPage, id }: Student) => (
  <Container fluid>
    <Container>
      <h4>{name}</h4>
      <p>{skills}</p>
      <p>
        <a href={professionalPage} />
      </p>
      <Link href={`/edit/${id}`}>Edit</Link>

      
    </Container>
  </Container>
);

export default StuffItem;
