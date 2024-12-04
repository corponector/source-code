import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProfilePage from '@/components/ProfilePage';
import { Student } from '@/components/Interface';

interface Params {
  id: string;
}

async function getStudent(id: number): Promise<Student | null> {
  const student = await prisma.student.findUnique({
    where: { id },
  });
  return student;
}

export default async function StudentProfilePage({ params }: { params: Params }) {
  const student = await getStudent(Number(params.id));

  if (!student) {
    return notFound();
  }

  return <ProfilePage student={student} />;
}
