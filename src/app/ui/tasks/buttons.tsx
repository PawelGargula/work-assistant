"use client"
import { 
  PencilIcon, 
  PlayCircleIcon, 
  PlusIcon,
  PauseCircleIcon,
  StopCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { completeTask, setTaskStatusAsNotTracking, startTrackingTask } from '@/src/app/lib/actions';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
}

export function CreateTask() {
  return (
    <Link
      href="/dashboard/tasks/create"
      className=" active:bg-violet-700 bg-violet-500 flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 font-medium h-10 items-center px-4 rounded-lg text-sm  text-white hover:bg-violet-600 transition-colors"
    >
      <span className="hidden md:block">Create Task</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTask({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tasks/${id}/edit`}
      className="border p-2 hover:text-violet-600 focus-visible:outline-violet-500 rounded-md"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function StartTrackingTask({ id }: { id: string }) {
  const startTrackingTaskWithId = startTrackingTask.bind(null, id);
  return (
    <form action={startTrackingTaskWithId}>
      <StartTrackingTaskButton />
    </form>
  );
}

function StartTrackingTaskButton() {
  const { pending } = useFormStatus(); 
  return (
    <button className="border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-violet-500 hover:text-green-600 p-2 rounded-md" disabled={pending} type='submit'>
      <span className="sr-only">Start tracking task</span>
      <PlayCircleIcon className="w-5" />
    </button>
  )
}

export function SetTaskStatusAsNotTracking({ id }: { id: string }) {
  const setTaskStatusAsNotTrackingWithId = setTaskStatusAsNotTracking.bind(null, id);
  return (
    <form action={setTaskStatusAsNotTrackingWithId}>
      <SetTaskStatusAsNotTrackingButton />
    </form>
  );
}

function SetTaskStatusAsNotTrackingButton() {
  const { pending } = useFormStatus(); 
  return (
    <button className="border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-violet-500 hover:text-slate-600 p-2 rounded-md" disabled={pending} type='submit'>
      <span className="sr-only">Set task status as Not tracking</span>
      <PauseCircleIcon className="w-5" />
    </button>
  )
}

export function CompleteTask({ id }: { id: string }) {
  const completeTaskWithId = completeTask.bind(null, id);
  return (
    <form action={completeTaskWithId}>
      <CompleteTaskButton />
    </form>
  );
}

function CompleteTaskButton() {
  const { pending } = useFormStatus(); 
  return (
    <button className="border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-violet-500 hover:text-violet-700 p-2 rounded-md" disabled={pending} type='submit'>
      <span className="sr-only">Complete Task</span>
      <StopCircleIcon className="w-5" />
    </button>
  )
}