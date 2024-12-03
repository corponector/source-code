import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Student } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';
import ProfilePage from '@/components/ProfilePage';

export default async function StudentProfilePage({ params }: { params: { id: string | string[] } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  const student: Student | null = await prisma.student.findUnique({
    where: { id },
  });

  if (!student) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <ProfilePage id={student.id} />
      </Container>
    </main>
  );
}
