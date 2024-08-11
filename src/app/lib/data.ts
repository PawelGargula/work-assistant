import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/src/app/lib/prisma';
import { auth } from '@/auth';
import { TaskStatus } from '@prisma/client';
import { getTimeDuration } from './utils';

const ITEMS_PER_PAGE = 6;

// Dashboard
export async function fetchCardData() {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const numberOfTasksPromise = prisma.task.count({
      where: {
        userId: userId,
      }
    });

    const timeTracksPromise = prisma.timeTrack.findMany({
      where: {
        task: {
          userId: userId
        }
      }
    });

    const completedTasksPlannedTimeSumPromise = prisma.task.aggregate({
      where: {
        userId: userId,
        status: TaskStatus.COMPLETED,
        plannedCompletionTime: { not: 0 },
      },
      _sum: {
        plannedCompletionTime: true
      },
    });

    const completedTimeTracksPromise = prisma.timeTrack.findMany({
      where: {
        task: {
          userId: userId,
          status: TaskStatus.COMPLETED,
          plannedCompletionTime: { not: 0 },
        }
      }
    })

    const data = await Promise.all([
      numberOfTasksPromise,
      timeTracksPromise,
      completedTasksPlannedTimeSumPromise,
      completedTimeTracksPromise
    ]);

    const numberOfTasks = Number(data[0]);
    const trackedInMs = data[1].reduce(
      (sum, currentTimeTrack) => sum + getTimeDuration(currentTimeTrack.startTime, currentTimeTrack.endTime), 
      0
    );

    const trackedHours = Math.floor((trackedInMs / (1000 * 60 * 60)));
    
    const completedTasksPlannedTimeSum = data[2]._sum.plannedCompletionTime ?? 0;
    const completedPlannedInMs = completedTasksPlannedTimeSum * 60 * 1000;
    const completedTrackedInMs = data[3].reduce(
      (sum, currentTimeTrack) => sum + getTimeDuration(currentTimeTrack.startTime, currentTimeTrack.endTime), 
      0
    );

    const trackedVsPlanned = completedTrackedInMs && completedPlannedInMs &&  Math.floor(completedTrackedInMs / completedPlannedInMs * 100)

    return {
      numberOfTasks,
      trackedHours,
      trackedVsPlanned,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchLatestTimeTracks() {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  const latestTimeTrackDateNumber = new Date().setUTCHours(0,0,0,0) - (7 * 24 * 60 * 60 * 1000);
  const latestTimeTrackDate = new Date(latestTimeTrackDateNumber).toISOString();
  try {
    const timeTracks = await prisma.timeTrack.findMany({
      where: {
        task: {
          userId: userId,
        },
        OR: [
          { endTime: { gte: latestTimeTrackDate} },
          { endTime: null }
        ]
      },
    });

    return timeTracks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch latest Time tracks.');
  }
}

export async function fetchLatestTasks() {
  noStore();

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: [
        {
          status: 'asc',
        },
        {
          updatedAt: { sort: 'desc', nulls: 'last'},
        },
        {
          createdAt: 'desc'
        }
      ],
      take: 7,
    })

    return tasks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch latest Tasks.');
  }
}

// Tasks
export async function fetchFilteredTasks(
  query: string, 
  currentPage: number,
  status: TaskStatus | undefined,
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
        },
        status: status
      },
      orderBy: [
        {
          status: 'asc',
        },
        {
          updatedAt: { sort: 'desc', nulls: 'last'},
        },
        {
          createdAt: 'desc'
        }
      ],
      skip: skip,
      take: ITEMS_PER_PAGE,
    })

    return tasks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Tasks table.');
  }
}

export async function fetchTasksPages(query: string, status: TaskStatus | undefined) {
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
        },
        status: status
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
  
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const timeTracks = prisma.timeTrack.findMany({
      where: {
          taskId: id,
          task: {
            userId: userId,
          }
      },
      orderBy: {
        startTime: 'desc'
      }
    });

    return timeTracks;
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