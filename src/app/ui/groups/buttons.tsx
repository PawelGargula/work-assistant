"use client"
import { 
  PencilIcon, 
  PlusIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Group } from '@prisma/client';
import { useRef, useActionState } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteGroup } from '../../lib/actions';
import LinkLoadingIndicator from '@/src/app/ui/link-loading-indicator';

export function CreateGroup() {
    return (
      <Link
        href="/dashboard/groups/create"
        className="active:bg-violet-700 bg-violet-500 flex gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 font-medium h-10 items-center px-4 rounded-lg text-sm text-white hover:bg-violet-600 transition-colors"
      >
        <span className="hidden md:block">Create Group</span>{' '}
        <LinkLoadingIndicator>
          <PlusIcon className="h-5" />
        </LinkLoadingIndicator>
      </Link>
    );
}

export function UpdateGroup({ id }: { id: string }) {
  const label = "Update Group";
  return (
    <Link
      aria-label={label}
      className="border p-2 hover:text-violet-600 focus-visible:outline-violet-500 rounded-md"
      href={`/dashboard/groups/${id}/edit`}
      title={label}
    >
      <LinkLoadingIndicator>
        <PencilIcon className="w-5" />
      </LinkLoadingIndicator>
    </Link>
  );
} 

export function DeleteGroup({ group } : { group: Group; }) {
  const expectedConfirmationValue = "delete group";
  const dialogRef = useRef<any>(null);
  const [confirmationValue, setConfirmationValue] = useState("");

  const initialState = { message: "", errors: {} };
  const deleteGroupWithId = deleteGroup.bind(null, group.id);
  const [state, dispatch] = useActionState(deleteGroupWithId, initialState);

  const label = "Delete Group";

  const DeleteGroupButton = () => {
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
              Delete Group
          </button>
      )
  }

  return (
      <>
          <dialog ref={dialogRef} className="max-w-sm p-4 rounded-md">
              <form>
                  <div className="flex justify-between items-center pb-2">
                      <h2 className="text-xl">Delete Group</h2>
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
                          <p className="text-balance text-sm">This will permanently <strong>delete the &quot;{group.name}&quot; Group</strong> and <strong>unassign related Tasks</strong>.</p>
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
                  <DeleteGroupButton />
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