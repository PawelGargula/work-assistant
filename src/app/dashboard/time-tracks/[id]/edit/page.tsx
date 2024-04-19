import Form from '@/src/app/ui/time-tracks/edit-form';
import Breadcrumbs from '@/src/app/ui/breadcrumbs';
import { fetchTimeTrackById } from '@/src/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Time track',
} 

export default async function Page({ params }: {params: { id: string }}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");

  const id = params.id;  
  const timeTrack = await fetchTimeTrackById(id);

  if (!timeTrack || timeTrack.endTime === null) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Time tracks', href: '/dashboard/time-tracks' },
          {
            label: 'Edit Time track',
            href: `/dashboard/time-tracks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form timeTrack={timeTrack} />
    </main>
  );
}