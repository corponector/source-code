/* eslint-disable no-restricted-globals */
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Company as PrismaCompany, Position } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';
import EditCompanyForm from '@/components/EditCompanyForm';

interface Company extends PrismaCompany {
  positions: Position[];
}

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const id = Array.isArray(params?.id) ? parseInt(params.id[0], 10) : parseInt(params?.id, 10);

  if (isNaN(id)) {
    console.error('Invalid ID:', params?.id);
    return notFound();
  }

  const company: Company | null = await prisma.company.findUnique({
    where: { id },
    include: {
      positions: true,
    },
  });

  if (!company) {
    console.error('Company not found for ID:', id);
    return notFound();
  }

  return (
    <main>
      <Container>
        <EditCompanyForm company={{ ...company, positions: company.positions || [] }} />
      </Container>
    </main>
  );
}
