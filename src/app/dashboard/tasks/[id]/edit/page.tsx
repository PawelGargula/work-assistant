import Form from '@/src/app/ui/tasks/edit-form';
import Breadcrumbs from '@/src/app/ui/breadcrumbs';
import { fetchAllGroups, fetchTaskById, fetchTimeTracksByTaskId } from '@/src/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Task',
} 

export default async function Page(props: {params: Promise<{ id: string }>}) {
  const params = await props.params;
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");

  const id = params.id;
  const task = await fetchTaskById(id);
  const taskTimeTracks = await fetchTimeTracksByTaskId(id);
  const groups = await fetchAllGroups();

  if (!task) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Edit Task',
            href: `/dashboard/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} taskTimeTracks={taskTimeTracks} groups={groups} />
    </main>
  );
}