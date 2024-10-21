"use client";

import { TimeTrack } from "@prisma/client";
import { formatTimeDuration, getTimeDuration, getTimeTracksByDateRange } from "@/src/app/lib/utils";

export default function ReportByDay({ timeTracks, from, to }: { timeTracks: TimeTrack[], from: string | undefined, to: string | undefined }) {
    if (!from || !to) {
        return <div>No date range provided</div>
    }
    
    const timeTracksByDay = getTimeTracksByDateRange(timeTracks, new Date(from), new Date(to));

    const sumOfAllDays = timeTracksByDay.reduce((sum, currentDay) => sum + currentDay.duration, 0);
    const avaragePerDay = sumOfAllDays / timeTracksByDay.length;

    return (
        <>
            {timeTracksByDay.length > 0 ? 
            <div className="overflow-auto">
                <table className="min-w-full text-gray-900 md:table">
                    <thead className="rounded-t-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-1 font-medium sm:pl-6">
                            Day
                        </th>
                        <th scope="col" className="px-3 py-1 font-medium">
                            Tracked Time
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {timeTracksByDay?.map((timeTrack) => (
                        <tr
                        key={timeTrack.day}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg"
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
                <div className="bg-white flex mt-1 px-8 py-3 rounded-b-lg text-sm">
                    <span className="font-medium">Avarage:</span><span className='ml-1'>{formatTimeDuration(avaragePerDay)}</span>
                    <span className="font-medium ml-auto">Total:</span><span className='ml-1'>{formatTimeDuration(sumOfAllDays)}</span>
                </div>
            </div> 
            : <span className="font-medium text-sm">There are currently no time tracks</span>}
        </>
    )
}