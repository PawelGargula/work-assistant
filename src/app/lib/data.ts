import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/src/app/lib/prisma';
import { auth } from '@/auth';

const ITEMS_PER_PAGE = 6;

// Tasks
export async function fetchFilteredTasks(
  query: string, 
  currentPage: number
) {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        title: {
          contains: query,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: skip,
      take: ITEMS_PER_PAGE,
    })

    return tasks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Tasks table.');
  }
}

export async function fetchTasksPages(query: string) {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const count = await prisma.task.count({
      where: {
        userId: userId,
        title: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

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
    throw new Error('Failed to fetch Task.');
  }
}

export async function fetchTimeTracksByTaskId(id: string) {
  noStore();
  
  try {
    const tasks = prisma.timeTrack.findMany({
      where: {
          taskId: id
      },
      orderBy: {
        startTime: 'desc'
      }
    });

    return tasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Time Tracks by Task id.');
  }
}

// Time tracks
export async function fetchFilteredTimeTracks(
  query: string, 
  currentPage: number
) {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const timeTracks = await prisma.timeTrack.findMany({
      where: {
        task: {
          userId: userId,
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      },
      skip: skip,
      take: ITEMS_PER_PAGE,
      include: {
        task: {
          select: {
            title: true,
          }
        }
      }
    });

    return timeTracks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Time tracks table.');
  }
}

export async function fetchTimeTracksPages(query: string) {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const count = await prisma.timeTrack.count({
      where: {
        task: {
          userId: userId,
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      }
    });

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of time tracks.');
  }
}

export async function fetchTimeTrackById(id: string) {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const timeTrack = await prisma.timeTrack.findUnique({
      where: {
        id: id,
        task: {
          userId: userId,
        }
      },
      include: {
        task: {
          select: {
            title: true,
          }
        }
      }
    });

    return timeTrack;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Time track.');
  }
}