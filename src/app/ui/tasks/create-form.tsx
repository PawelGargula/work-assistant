'use client';

import Link from 'next/link';
import { Button } from '@/src/app/ui/button';
import { createTask } from '@/src/app/lib/actions';
import Description from '@/src/app/ui/tasks/rich-text/description';
import { useState, useActionState } from 'react';
import { Group } from '@prisma/client/index-browser';
import SelectGroup from '@/src/app/ui/tasks/select-group';
import LinkLoadingIndicator from '@/src/app/ui/link-loading-indicator';

export default function Form({ groups }: { groups: Group[] }) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(createTask, initialState);

  const [description, setDescription] = useState("");

  return (
    <form action={dispatch} aria-describedby='create-error'>
      <div className="bg-gray-50 md:p-6 p-4 rounded-md">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2 text-sm">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter Title"
            className="bg-white block border border-slate-300 focus-visible:outline-violet-500 placeholder-slate-400 px-3 py-2 rounded-md w-full"
            aria-describedby='title-error'
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
              <Description description={description} setDescription={setDescription} />
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
              defaultValue={0}
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
              defaultValue={0}
              className="bg-white block border border-slate-300 focus-visible:outline-violet-500  px-3 py-2 rounded-md w-full"
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
        
        {/* Assign to Group */}
        <SelectGroup defaultValue="" groups={groups} />

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
          className="bg-gray-100 flex gap-2 items-center font-medium focus-visible:outline-violet-500 h-10 hover:bg-gray-200 px-4 rounded-lg text-sm text-gray-600 transition-colors"
        >
          <span>Cancel</span>
          <LinkLoadingIndicator />
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
