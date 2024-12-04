import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProfilePage from '@/components/StudentProfile';
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
  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) {
    return notFound();
  }

  const student = await getStudent(id);

  if (!student) {
    return notFound();
  }

  return <ProfilePage student={student} />;
}
