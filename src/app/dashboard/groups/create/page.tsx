import Form from '@/src/app/ui/groups/create-form';
import Breadcrumbs from '@/src/app/ui/breadcrumbs';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
 
export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Groups', href: '/dashboard/groups' },
          {
            label: 'Create Group',
            href: '/dashboard/groups/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}