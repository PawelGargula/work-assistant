'use client';

import Link from 'next/link';
import { Button } from '@/src/app/ui/button';
import { updateTimeTrack } from '@/src/app/lib/actions';
import { useFormState } from 'react-dom';
import { formatDateForDateTimeLocalInput } from '../../lib/utils';

type TimeTrackWithTaskTitle = {
    id: string,
    startTime: Date,
    endTime: Date | null,
    task: {
        title: string
    }
}

export default function EditTaskForm({
    timeTrack
} : {
    timeTrack: TimeTrackWithTaskTitle
}) {
    const initialState = { message: "", errors: {} };
    const updateTimeTrackWithId = updateTimeTrack.bind(null, timeTrack.id);
    const [state, dispatch] = useFormState(updateTimeTrackWithId, initialState);

    return (
        <form action={dispatch} aria-describedby='create-error'>
            <div className="bg-gray-50 md:p-6 p-4 rounded-md">
                {/* Task title */}
                <div className="mb-4">
                    <p className="block font-medium mb-2 text-md">
                        Tracked task - {timeTrack.task.title}
                    </p>
                </div>

                <div className='flex gap-4 flex-wrap'>
                    {/* Start */}
                    <div className='w-full md:w-fit'>
                        <label htmlFor="start-time" className="block font-medium text-sm">
                            Start
                        </label>
                        <input
                        aria-describedby='start-time-error'
                        className="bg-white block border border-slate-300 focus-visible:outline-violet-500 placeholder-slate-400 px-3 py-2 rounded-md w-full"
                        defaultValue={formatDateForDateTimeLocalInput(timeTrack.startTime)}
                        id="start-time"
                        name="start-time"
                        placeholder="Enter Start"
                        type="datetime-local"
                        />
                        <div id="start-time-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.startTime &&
                            state.errors.startTime.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                            ))}
                        </div>
                    </div>

                    {/* End */}
                    <div className='w-full md:w-fit'>
                        <label htmlFor="end-time" className="block font-medium text-sm">
                            End
                        </label>
                        <input
                        aria-describedby='end-time-error'
                        className="bg-white block border border-slate-300 focus-visible:outline-violet-500 placeholder-slate-400 px-3 py-2 rounded-md w-full"
                        defaultValue={formatDateForDateTimeLocalInput(timeTrack.endTime)}
                        id="end-time"
                        name="end-time"
                        placeholder="Enter End"
                        type="datetime-local"
                        />
                        <div id="end-time-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.endTime &&
                            state.errors.endTime.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                            ))}
                        </div>
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
                href="/dashboard/time-tracks"
                className="bg-gray-100 flex font-medium focus-visible:outline-violet-500 h-10 hover:bg-gray-200 items-center px-4 rounded-lg text-sm text-gray-600 transition-colors"
            >
                Cancel
            </Link>
            <Button type="submit">Edit Time track</Button>
            </div>
        </form>
    );
}
