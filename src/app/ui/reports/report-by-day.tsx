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
            {timeTracksByDay.length > 0 ? <div className="overflow-auto">
            <table className="min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
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
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
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
                <tfoot className="bg-white">
                    <tr className="w-full border-t py-3 text-sm rounded-bl-lg rounded-br-lg">
                        <th className="font-medium px-3 py-1 text-right" scope="row">
                            Sum
                        </th>
                        <td className="whitespace-nowrap px-3 py-3">
                            {formatTimeDuration(sumOfAllDays)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div> : <span className="font-medium text-sm">There are currently no time tracks</span>}
        </>
    )
}