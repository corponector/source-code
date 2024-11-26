import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Student, Company } from '@/lib/validationSchemas';
import SearchPageContent from '@/components/SearchPageContent';

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
      professionalPage: true,
    },
  });

  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      overview: true,
      location: true,
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

  return { students, companies };
};

const SearchPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Handle unauthenticated state
    return <div>Please log in to view this page.</div>;
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
