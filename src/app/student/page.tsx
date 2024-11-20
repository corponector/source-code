import { getServerSession } from 'next-auth';
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StudentInfo from '@/components/StudentInfo';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
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
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <StudentInfo key={StudentInfo.id} {...student} />
      </Container>
    </main>
  );
};

export default StudentPage;
