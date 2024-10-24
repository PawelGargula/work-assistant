"use client";

import { TimeTrack } from "@prisma/client";
import { formatTimeDuration, getTimeTracksByDateRange } from "@/src/app/lib/utils";

export default function ReportByDay({ timeTracks, from, to }: { timeTracks: TimeTrack[], from: string | undefined, to: string | undefined }) {
    if (!from || !to) {
        return <div>No period selected</div>
    }
    
    const timeTracksByDay = getTimeTracksByDateRange(timeTracks, new Date(from), new Date(to));

    const sumOfAllDays = timeTracksByDay.reduce((sum, currentDay) => sum + currentDay.duration, 0);
    const avaragePerDay = sumOfAllDays / timeTracksByDay.length;

    return (
        <>
            {timeTracksByDay.length > 0 ? 
            <>
                <div className="max-h-[calc(100dvh-0.75rem-3rem-32px-2rem-39px-1.5rem-1.5rem-0.25rem-44px-1.5rem-3rem-0.75rem)] overflow-auto">
                    <table className="min-w-full text-gray-900 md:table">
                        <thead className="bg-gray-50 font-normal rounded-t-lg shadow sticky text-left text-sm top-0">
                        <tr>
                            <th scope="col" className="px-4 pb-2 font-medium sm:pl-6">
                                Day
                            </th>
                            <th scope="col" className="px-3 pb-2 font-medium">
                                Tracked Time
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {timeTracksByDay?.map((timeTrack) => (
                            <tr
                            key={timeTrack.day}
                            className="w-full border-b py-3 text-sm last-of-type:border-none"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {timeTrack.day}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {formatTimeDuration(timeTrack.duration)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div> 
                <div className="bg-white flex mt-1 px-6 py-3 rounded-b-lg text-sm">
                    <span className="font-medium">Day Avarage:</span><span className='ml-1'>{formatTimeDuration(avaragePerDay)}</span>
                    <span className="font-medium ml-auto">Total:</span><span className='ml-1'>{formatTimeDuration(sumOfAllDays)}</span>
                </div>
            </>
            : <span className="font-medium text-sm">No days</span>}
        </>
    )
}