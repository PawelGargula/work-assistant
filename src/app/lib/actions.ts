'use server'

import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from '@/src/app/lib/prisma';
import { TaskStatus } from '@prisma/client';
import { fetchTaskById, fetchTimeTrackById } from '@/src/app/lib/data';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("e-mail");
    await signIn("nodemailer", { email: email, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Something went wrong.';
    }
    throw error;
  }
}

// Tasks

const CreateTaskFormSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" }),
  minutes: z.coerce.number().int().nonnegative().lte(59),
  hours: z.coerce.number().int().nonnegative(),
  userId: z.string().cuid(),
  createdAt: z.string(),
  status: z.nativeEnum(TaskStatus)
});

const CreateTask = CreateTaskFormSchema.omit({ id: true, userId: true, createdAt: true, status: true });
const UpdateTask = CreateTaskFormSchema.omit({ id: true, userId: true, createdAt: true });

export type CreateTaskState = {
  errors?: {
    title?: string[];
    hours?: string[];
    minutes?: string[];
  };
  message?: string | null;
}

export type UpdateTaskState = {
  errors?: {
    title?: string[];
    hours?: string[];
    minutes?: string[];
    status?: string[];
  };
  message?: string | null;
}

export async function createTask(prevState: CreateTaskState, formData: FormData) {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  if (!isLoggedIn) {
    return {
      message: 'You are not logged in.',
    };
  }

  // Validate form using Zod
  const validatedFields = CreateTask.safeParse({
    title: formData.get('title'),
    hours: formData.get('hours'),
    minutes: formData.get('minutes'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  // Prepare data for insertion into the database
  const { title, minutes, hours } = validatedFields.data;
  const plannedCompletionTime = hours * 60 + minutes;
  const description = formData.get('description')?.toString() ?? "";
  const userId = session?.user?.id as string;

  // Insert data into the database
  try {
    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        plannedCompletionTime: plannedCompletionTime,
        userId: userId
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.

    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }

  // Revalidate the cache for the tasks page and redirect the tasks.
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function updateTask(id: string, prevState: UpdateTaskState, formData: FormData) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const isLoggedIn = !!sessionUserId;

  if (!isLoggedIn) {
    return {
      message: 'You are not logged in.',
    };
  }

  // Validate form using Zod
  const validatedFields = UpdateTask.safeParse({
    title: formData.get('title'),
    hours: formData.get('hours'),
    minutes: formData.get('minutes'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }

  // Prepare data for insertion into the database
  const { title, minutes, hours, status } = validatedFields.data;
  const plannedCompletionTime = hours * 60 + minutes;
  const description = formData.get('description')?.toString().trim();

  // Insert data into the database
  try {
    const prevTask = await fetchTaskById(id);

    if (!prevTask) {
      return {
        message: 'Failed to Update Task.',
      };
    }

    const isStatusChanged = prevTask?.status !== status;
    if (isStatusChanged && status === TaskStatus.TRACKING) {
      // Cleanup other active tasks and it's timeTracks
      await prisma.task.updateMany({
        where: {
          userId: sessionUserId,
          status: TaskStatus.TRACKING,
        },
        data: {
          status: TaskStatus.NOTTRACKING
        }
      });
      await prisma.timeTrack.updateMany({
        where: {
          task: {
            userId: sessionUserId
          },
          endTime: null,
        },
        data: {
          endTime: new Date()
        }
      });

      // Setup
      await prisma.timeTrack.create({
        data: {
          taskId: id
        }
      });
    }

    if (isStatusChanged && (status === TaskStatus.NOTTRACKING || status === TaskStatus.COMPLETED)) {
      await prisma.timeTrack.updateMany({
        where: {
          taskId: id,
          endTime: null
        },
        data: {
          endTime: new Date()
        }
      });
    }

    await prisma.task.update({
      where: {
        id: id
      },
      data: {
        title: title,
        description: description,
        plannedCompletionTime: plannedCompletionTime,
        status: status
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.

    return {
      message: 'Database Error: Failed to Update Task.',
    };
  }

  // Revalidate the cache for the tasks page and redirect the tasks.
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function startTrackingTask(id: string) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const isLoggedIn = !!sessionUserId;

  if (!isLoggedIn) {
    return {
      message: 'You are not logged in.',
    };
  }

  try {
    const prevTask = await fetchTaskById(id);

    const isStatusChanged = prevTask?.status !== TaskStatus.TRACKING;
    if (!isStatusChanged) return;

    // Cleanup other active tasks and it's timeTracks
    await prisma.task.updateMany({
      where: {
        userId: sessionUserId,
        status: TaskStatus.TRACKING,
      },
      data: {
        status: TaskStatus.NOTTRACKING
      }
    });

    await prisma.timeTrack.updateMany({
      where: {
        task: {
          userId: sessionUserId
        },
        endTime: null,
      },
      data: {
        endTime: new Date()
      }
    });

    // Setup
    await prisma.timeTrack.create({
      data: {
        taskId: id
      }
    });

    await prisma.task.update({
      where: {
        id: id
      },
      data: {
        status: TaskStatus.TRACKING
      }
    });

    // Revalidate the cache for the tasks page.
    revalidatePath('/dashboard/tasks');
  } catch (error) {
    return { message: 'Database Error: Failed to start tracking Task.' };
  }
}

export async function setTaskStatusAsNotTracking(id: string) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const isLoggedIn = !!sessionUserId;

  if (!isLoggedIn) {
    return {
      message: 'You are not logged in.',
    };
  }

  try {
    const prevTask = await fetchTaskById(id);

    const isStatusChanged = prevTask?.status !== TaskStatus.NOTTRACKING;
    if (!isStatusChanged) return;

    await prisma.timeTrack.updateMany({
      where: {
        taskId: id,
        endTime: null
      },
      data: {
        endTime: new Date()
      }
    });

    await prisma.task.update({
      where: {
        id: id
      },
      data: {
        status: TaskStatus.NOTTRACKING
      }
    });

    // Revalidate the cache for the tasks page.
    revalidatePath('/dashboard/tasks');
  } catch (error) {
    return { message: 'Database Error: Failed to set Task status to Not tracking.' };
  }
}

export async function completeTask(id: string) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const isLoggedIn = !!sessionUserId;

  if (!isLoggedIn) {
    return {
      message: 'You are not logged in.',
    };
  }

  try {
    const prevTask = await fetchTaskById(id);

    const isStatusChanged = prevTask?.status !== TaskStatus.COMPLETED;
    if (!isStatusChanged) return;

    await prisma.timeTrack.updateMany({
      where: {
        taskId: id,
        endTime: null
      },
      data: {
        endTime: new Date()
      }
    });

    await prisma.task.update({
      where: {
        id: id
      },
      data: {
        status: TaskStatus.COMPLETED
      }
    });

    // Revalidate the cache for the tasks page.
    revalidatePath('/dashboard/tasks');
  } catch (error) {
    return { message: 'Database Error: Failed to complete Task.' };
  }
}

// Time tracks
const TimeTrackFormSchema = z.object({
  id: z.string().cuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

const UpdateTimeTrack = TimeTrackFormSchema.omit({ id: true });

export type UpdateTimeTrackState = {
  errors?: {
    startTime?: string[];
    endTime?: string[];
  };
  message?: string | null;
  timeTrackOccupied?: {
    taskTitle?: string | null,
    startTime?: string | null,
    endTime?: string | null,
  };
}

export async function updateTimeTrack(id: string, prevState: UpdateTimeTrackState, formData: FormData) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const isLoggedIn = !!sessionUserId;

  if (!isLoggedIn) {
    return {
      message: 'You are not logged in.',
    };
  }

  // Validate form using Zod
  const validatedFields = UpdateTimeTrack.safeParse({
    startTime: formData.get('start-time'),
    endTime: formData.get('end-time'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Time track.',
    };
  }

  // Prepare data for insertion into the database
  const { startTime, endTime } = validatedFields.data;

  // Additional validation
  if (endTime < startTime) {
    return {
      message: "End can't be before Start",
    };
  }

  // Insert data into the database
  try {
    // Additional validation
    const prevTimeTrack = await fetchTimeTrackById(id);
    if (!prevTimeTrack) {
      return {
        message: 'Failed to Update Time track.',
      };
    }

    const timeTrackOccupied = await prisma.timeTrack.findFirst({
      where: {
        OR: [
          { id: { not: id }, startTime: { lte: startTime }, endTime: { gte: startTime } }, // Start time inside other
          { id: { not: id }, startTime: { lte: endTime }, endTime: { gte: endTime } }, // End time inside other
          { id: { not: id }, startTime: { gte: startTime , lte: endTime} }, // Other Start time between saving Start and End
          { id: { not: id }, startTime: { lte: endTime }, endTime: null } // Saving End time after active (curently tracking) Time track Start
        ],
      },
      include: {
        task: {
          select: {
            title: true,
          }
        }
      },
    });

    if (timeTrackOccupied !== null) {
      return {
        state: {
          timeTrackOccupied: {
            title: timeTrackOccupied.task.title,
            startTime: timeTrackOccupied.startTime,
            endTime: timeTrackOccupied.endTime
          }
        }
      };
    }

    await prisma.timeTrack.update({
      data: {
        startTime: startTime,
        endTime: endTime
      },
      where: {
        id: id
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.

    return {
      message: 'Database Error: Failed to Update Time track.',
    };
  }

  // Revalidate the cache for the tasks page and redirect the tasks.
  revalidatePath('/dashboard/time-tracks');
  redirect('/dashboard/time-tracks');
}