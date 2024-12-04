import { prisma } from '@/lib/prisma';
import CompanyProfile from '@/components/CompanyProfile';

interface CompanyProfilePageProps {
  params: {
    id: string;
  };
}

const CompanyProfilePage = async ({ params }: CompanyProfilePageProps) => {
  const id = parseInt(params.id, 10);
  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      positions: true,
    },
  });

  if (!company) {
    return {
      notFound: true,
    };
  }

  return <CompanyProfile company={company} />;
};

export default CompanyProfilePage;
