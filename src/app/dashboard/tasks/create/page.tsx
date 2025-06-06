import Form from '@/src/app/ui/tasks/create-form';
import Breadcrumbs from '@/src/app/ui/breadcrumbs';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { fetchAllGroups } from '@/src/app/lib/data';
 
export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");

  const groups = await fetchAllGroups();

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
      <Form groups={groups}/>
    </main>
  );
}