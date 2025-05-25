"use client";

import { useActionState } from "react";
import Link from 'next/link';
import { Button } from '@/src/app/ui/button';
import { createGroup } from '@/src/app/lib/actions';

export default function Form() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(createGroup, initialState);

  return (
    <form action={dispatch} aria-describedby='create-error'>
        <div className="bg-gray-50 md:p-6 p-4 rounded-md">
            {/* Group Name */}
            <div className="mb-4">
                <label htmlFor="group-name" className="block font-medium mb-2 text-sm">
                    Name
                </label>
                <input
                aria-describedby='name-error'
                className="bg-white block border border-slate-300 focus-visible:outline-violet-500 placeholder-slate-400 px-3 py-2 rounded-md w-full"
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
                className="bg-gray-100 flex font-medium focus-visible:outline-violet-500 h-10 hover:bg-gray-200 items-center px-4 rounded-lg text-sm text-gray-600 transition-colors"
            >
                Cancel
            </Link>
            <Button type="submit">Create Group</Button>
        </div>
    </form>
  );
}
