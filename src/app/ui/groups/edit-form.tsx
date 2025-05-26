"use client";

import { useActionState } from "react";
import Link from 'next/link';
import { Button } from '@/src/app/ui/button';
import { updateGroup } from '@/src/app/lib/actions';
import { Group } from '@prisma/client';
import LinkLoadingIndicator from '@/src/app/ui/link-loading-indicator';
export default function EditGroupForm({
    group
} : {
    group: Group
}) {
    const initialState = { message: "", errors: {} };
    const updateGroupWithId = updateGroup.bind(null, group.id);
    const [state, dispatch] = useActionState(updateGroupWithId, initialState);

    return (
        <form action={dispatch} aria-describedby='create-error'>
          <div className="bg-gray-50 md:p-6 p-4 rounded-md">
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2 text-sm">
                Name
              </label>
              <input
                aria-describedby='name-error'
                className="bg-white block border border-slate-300 focus-visible:outline-violet-500 placeholder-slate-400 px-3 py-2 rounded-md w-full"
                defaultValue={group.name}
                id="group-name"
                name="group-name"
                placeholder="Enter name"
                type="text"
              />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
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
              href="/dashboard/groups"
              className="bg-gray-100 flex gap-2 items-center font-medium focus-visible:outline-violet-500 h-10 hover:bg-gray-200 px-4 rounded-lg text-sm text-gray-600 transition-colors"
            >
              <span>Cancel</span>
              <LinkLoadingIndicator />
            </Link>
            <Button type="submit">Edit Group</Button>
          </div>
        </form>
    );
}
