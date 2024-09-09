// Utilisez un composant côté serveur pour vérifier l'authentification
import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import PasserTestForm from '@/app/components/PasserTestForm';

export default async function PagePasserTest() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  return <PasserTestForm userId={user.id} />;
}
