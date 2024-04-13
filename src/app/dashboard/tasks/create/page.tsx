import Form from '@/src/app/ui/tasks/create-form';
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
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Create Task',
            href: '/dashboard/tasks/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}