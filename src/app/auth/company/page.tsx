import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import AddCompanyForm from '@/components/AddCompanyForm';

const AddCompany = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main className="semi-transparent pt-2">
      <AddCompanyForm />
    </main>
  );
};

export default AddCompany;
