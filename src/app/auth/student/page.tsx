import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddStudentForm from '@/components/AddStudentForm';
import authOptions from '@/lib/authOptions';

const AddStudent = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main className="semi-transparent pt-2">
      <AddStudentForm />
    </main>
  );
};

export default AddStudent;
