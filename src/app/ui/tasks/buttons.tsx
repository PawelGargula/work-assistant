"use client"
import { 
  ExclamationTriangleIcon,
  PencilIcon, 
  PlayCircleIcon, 
  PlusIcon,
  PauseCircleIcon,
  StopCircleIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { completeTask, setTaskStatusAsNotTracking, startTrackingTask, deleteTask } from '@/src/app/lib/actions';
import { useFormStatus } from 'react-dom';
import { useRef, useState, useActionState } from "react";
import { Task } from '@prisma/client';

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
      aria-label="Update Task"
      title='Update Task'
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
  const label = 'Start tracking Task';
  return (
    <button aria-label={label} className="border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-violet-500 hover:text-green-600 p-2 rounded-md" disabled={pending} title={label} type='submit'>
      {pending 
        ? <PendingAnimation />
        : <PlayCircleIcon className="w-5" />
      }
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
  const label = 'Set Task status as Not tracking';
  return (
    <button aria-label={label} className="border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-violet-500 hover:text-slate-600 p-2 rounded-md" disabled={pending} title={label} type='submit'>
      {pending 
        ? <PendingAnimation />
        : <PauseCircleIcon className="w-5" />
      }
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
  const label = 'Complete Task';
  return (
    <button aria-label={label} className="border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-violet-500 hover:text-violet-700 p-2 rounded-md" disabled={pending} title={label} type='submit'>
      {pending 
        ? <PendingAnimation />
        : <StopCircleIcon className="w-5" />
      }
    </button>
  )
}

function PendingAnimation() {
  return (
    <svg className="animate-spin h-5 w-5 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

export function DeleteTask({ task } : { task: Task; }) {
  const expectedConfirmationValue = "delete task";
  const dialogRef = useRef<any>(null);
  const [confirmationValue, setConfirmationValue] = useState("");

  const initialState = { message: "", errors: {} };
  const deleteTaskWithId = deleteTask.bind(null, task.id);
  const [state, dispatch] = useActionState(deleteTaskWithId, initialState);

  const label = "Delete Task";

  const DeleteTaskButton = () => {
      const { pending } = useFormStatus(); 
      return (
          <button 
              className="active:bg-red-700 bg-red-500 disabled:cursor-not-allowed disabled:opacity-70 flex font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 h-10 hover:bg-red-600 items-center justify-center px-4 rounded-lg text-sm text-white transition-colors w-full" 
              disabled={confirmationValue !== expectedConfirmationValue || pending}
              type="submit"
          >
              {pending && 
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              }
              Delete Task
          </button>
      )
  }

  return (
      <>
          <dialog ref={dialogRef} className="max-w-sm p-4 rounded-md">
              <form>
                  <div className="flex justify-between items-center pb-2">
                      <h2 className="text-xl">Delete Task</h2>
                      <button 
                          aria-label="Cancel" 
                          className="focus-visible:outline-violet-500 hover:text-violet-700"
                          formMethod="dialog"
                          title="Cancel"
                          type="submit"
                      >
                          <XMarkIcon className="w-5" />
                      </button>
                  </div>
                  <div className="border-y py-2">
                      <div className="bg-yellow-300 p-2 rounded-md">
                          <div className="flex justify-between">
                              <h3 className="font-medium">Warning</h3>
                              <ExclamationTriangleIcon className="w-5"/>
                          </div>
                          <p className="text-balance text-sm">This will permanently <strong>delete &quot;{task.title}&quot; Task</strong> and associated <strong>Time tracks</strong>.</p>
                      </div>
                  </div>
              </form>
              <form action={dispatch} autoComplete="off" aria-describedby='delete-error'>
                  <div className="py-2">
                      <label 
                          className="font-medium mb-2 text-sm" 
                          htmlFor="confirmation"
                      >To confirm, type &quot;{expectedConfirmationValue}&quot;</label>
                      <input 
                          className="bg-white block border border-slate-300 focus-visible:outline-violet-500  placeholder-slate-400 px-2 py-1 rounded-md w-full"
                          id="confirmation" 
                          name="confirmation" 
                          placeholder="Confirm"
                          value={confirmationValue}
                          type="text" 
                          onChange={(e) => setConfirmationValue(e.target.value)}
                      />
                  </div>
                  <DeleteTaskButton />
                  {/* Error summary */}
                  <div id="delete-error" aria-live="polite" aria-atomic="true">
                      {state?.message && 
                          <p className="mt-2 text-sm text-red-500">
                              {state.message}
                          </p>
                      }
                  </div>
              </form>
          </dialog>
          <button
            aria-label={label} 
            className='border disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-red-500 hover:text-red-700 p-2 rounded-md'
            title={label} 
            type="button"
            onClick={() => dialogRef.current?.showModal()}
          >
            <TrashIcon className="w-5" />
          </button>
      </>
  )
}