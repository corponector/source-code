import { getServerSession } from 'next-auth';
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StudentInfo from '@/components/StudentInfo';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';

const StudentPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const student = await prisma.student.findMany({
    where: {
      owner,
    },
  });
  return (
    <main className="semi-transparent">
      <Container className="py-3">
        {student.map((s) => (
          <>
            <StudentInfo key={s.id} {...s} />
            <Container className="my-5 bg-primary edit-container p-2">
              <Link href={`/student/edit/${s.id}`} style={{ color: 'white' }}>Edit</Link>
            </Container>
          </>
        ))}
      </Container>
    </main>
  );
};

export default StudentPage;
