import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Student, Company } from '@/components/Interface';
import SearchPageContent from '@/components/SearchPageContent';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

interface SearchPageProps {
  students: Student[];
  companies: Company[];
}

const fetchStudentsAndCompanies = async (): Promise<SearchPageProps> => {
  const students = await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      skills: true,
      location: true,
      profileImage: true,
      professionalPage: true,
    },
  });

  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      overview: true,
      location: true,
      profileImage: true,
      links: true,
      emails: true,
      positions: {
        select: {
          id: true,
          title: true,
          description: true,
          skills: true,
          jobType: true,
          numberOfHires: true,
          salaryRange: true,
        },
      },
    },
  });

  // Convert links and emails from arrays to strings
  const formattedCompanies = companies.map(company => ({
    ...company,
    links: Array.isArray(company.links) ? company.links.join(', ') : company.links,
    emails: Array.isArray(company.emails) ? company.emails.join(', ') : company.emails,
  }));

  return { students, companies: formattedCompanies };
};

const SearchPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Handle unauthenticated state
    return (
      <main className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} className="text-center">
              <h1>
                Please
                {' '}
                <Link href="/auth/signin">sign in</Link>
                {' '}
                or
                {' '}
                <Link href="/auth/signup">sign up</Link>
                {' '}
                to Search for Students and Companies
              </h1>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
  loggedInProtectedPage(
    session as unknown as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const { students, companies } = await fetchStudentsAndCompanies();

  return (
    <SearchPageContent students={students} companies={companies} />
  );
};

export default SearchPage;
