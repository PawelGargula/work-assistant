import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/src/app/lib/prisma';
import { auth } from '@/auth';

export async function fetchTaskById(id: string) {
  noStore();
  
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const task = prisma.task.findUnique({
      where: {
          id: id,
          userId: userId,
      },
    });

    return task;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch task.');
  }
}