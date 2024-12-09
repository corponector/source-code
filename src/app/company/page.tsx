import { getServerSession } from 'next-auth';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import CompanyCard from '@/components/CompanyCard';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
import { Company } from '@prisma/client';

const CompanyPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const students = await prisma.student.findMany({
    where: {
      owner,
    },
  });
  const companies = await prisma.company.findMany({
    include: {
      positions: true,
    },
  });
  return (
    <main className="semi-transparent">
      <Container className="py-3">
        {companies.map((company) => (
          <Row key={company.id}>
            <Col xs>
              <CompanyCard company={company} />
              <Container>
                <Button className="my-5">
                  <Link href={`/company/edit/${company.id}`} style={{ color: 'white' }}>
                    Edit
                  </Link>
                </Button>
              </Container>
            </Col>
            <Col md>
              <h1>Recommended Students</h1>
              {companies.map((company: Company) => (
                <Container key={company.id}>
                  <h3>{company.name}</h3>
                  <h3>
                    Location:
                    {company.location}
                  </h3>
                  <h3>Overview: </h3>
                  <p>{company.overview}</p>
                  <h3>Emails: </h3>
                  <p>{Array.isArray(company.emails) ? company.emails.join(', ') : company.emails}</p>
                  <h3>Links: </h3>
                  <p>{Array.isArray(company.links) ? company.links.join(', ') : company.links}</p>
                </Container>
              ))}
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  );
};

export default CompanyPage;
