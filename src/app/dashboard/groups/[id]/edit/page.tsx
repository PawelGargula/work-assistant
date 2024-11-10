import Form from '@/src/app/ui/groups/edit-form';
import Breadcrumbs from '@/src/app/ui/breadcrumbs';
import { fetchGroupById } from '@/src/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Group',
} 

export default async function Page({ params }: {params: { id: string }}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");

  const id = params.id;  
  const group = await fetchGroupById(id);

  if (!group) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Group', href: '/dashboard/groups' },
          {
            label: 'Edit Group',
            href: `/dashboard/groups/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form group={group} />
    </main>
  );
}