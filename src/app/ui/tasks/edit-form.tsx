'use client';

import Link from 'next/link';
import { Button } from '@/src/app/ui/button';
import { updateTask } from '@/src/app/lib/actions';
import { useFormState } from 'react-dom';
import Description from '@/src/app/ui/tasks/rich-text/description';
import { Task } from '@prisma/client';
import { PauseCircleIcon, PlayCircleIcon, StopCircleIcon, PlayPauseIcon } from '@heroicons/react/24/outline';
import { TaskStatus } from '@prisma/client';

export default function EditTaskForm({
  task
}: {
  task: Task
}) {
  const initialState = { message: "", errors: {} };
  const updateTaskWithId = updateTask.bind(null, task.id);
  const [state, dispatch] = useFormState(updateTaskWithId, initialState);

  const defaultHours = Math.floor(task.plannedCompletionTime / 60);
  const defaultMinutes = task.plannedCompletionTime % 60;

  return (
    <form action={dispatch} aria-describedby='create-error'>
      <div className="bg-gray-50 md:p-6 p-4 rounded-md">
        {/* Status */}
        <p className='font-medium mb-2 text-sm'>Status</p>
        <div className="mb-4 flex flex-wrap gap-3">
          <label className='cursor-pointer flex gap-2 ring-slate-300 has-[:checked]:ring-slate-600 has-[:checked]:text-slate-600 rounded-lg p-2 ring-1 ring-transparent hover:text-slate-600' htmlFor="not-tracking">
            <PauseCircleIcon className="w-6"/>
            Not tracking
            <input className='appearance-none' type="radio" name="status" id="not-tracking" value={TaskStatus.NOTTRACKING} defaultChecked={task.status === TaskStatus.NOTTRACKING} />
          </label>

          <label className='cursor-pointer flex gap-2 ring-slate-300 has-[:checked]:ring-green-600 has-[:checked]:text-green-600 rounded-lg p-2 ring-1 ring-transparent hover:text-green-600' htmlFor="tracking">
            <PlayCircleIcon className="w-6"/>
            Tracking
            <input className='appearance-none' type="radio" name="status" id="tracking" value={TaskStatus.TRACKING} defaultChecked={task.status === TaskStatus.TRACKING} />
          </label>

          <label className='cursor-pointer flex gap-2 ring-slate-300 has-[:checked]:ring-violet-700 has-[:checked]:text-violet-700 rounded-lg p-2 ring-1 ring-transparent hover:text-violet-700' htmlFor="completed">
            <StopCircleIcon className="w-6"/>
            Completed
            <input className='appearance-none' type="radio" name="status" id="completed" value={TaskStatus.COMPLETED} defaultChecked={task.status === TaskStatus.COMPLETED} />
          </label>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2 text-sm">
            Title
          </label>
          <input
            aria-describedby='title-error'
            className="bg-white block border border-slate-300 focus-visible:outline-violet-500 placeholder-slate-400 px-3 py-2 rounded-md w-full"
            defaultValue={task.title}
            id="title"
            name="title"
            placeholder="Enter Title"
            type="text"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
              <Description defaultValue={task.description} />
        </div>

        {/* Planned comletion time */}
        {/* Hours */}
        <div className="mb-4">
          <p className="block font-medium text-sm">Planned completion time</p>
          <div className='w-20 inline-block mr-1'>
            <label htmlFor="hours" className="font-medium inline-block text-xs w-full">
              Hours
            </label>
            <input
              id="hours"
              name="hours"
              type="number"
              defaultValue={defaultHours}
              className="bg-white block border border-slate-300 focus-visible:outline-violet-500 px-3 py-2 rounded-md w-full"
              aria-describedby='hours-error'
              min={0}
            />
          </div>
          <div className='w-20 inline-block'>
            <label htmlFor="minutes" className="font-medium inline-block mr-1 text-xs w-full">
              Minutes
            </label>
            <input
              id="minutes"
              name="minutes"
              type="number"
              defaultValue={defaultMinutes}
              className="bg-white block border border-slate-300 focus-visible:outline-violet-500 px-3 py-2 rounded-md w-full"
              aria-describedby='minutes-error'
              min={0}
              max={59}
            />
          </div>
          <div id="hours-error" aria-live="polite" aria-atomic="true">
            {state.errors?.hours &&
              state.errors.hours.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div id="minutes-error" aria-live="polite" aria-atomic="true">
            {state.errors?.minutes &&
              state.errors.minutes.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        {/* Error summary */}
        <div id="create-error" aria-live="polite" aria-atomic="true">
            {state.message && 
                <p className="mt-2 text-sm text-red-500">
                  {state.message}
                </p>
            }
          </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="bg-gray-100 flex font-medium focus-visible:outline-violet-500 h-10 hover:bg-gray-200 items-center px-4 rounded-lg text-sm text-gray-600 transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Task</Button>
      </div>
    </form>
  );
}
