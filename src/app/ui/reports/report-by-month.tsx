"use client";

import { TimeTrack } from "@prisma/client";
import { formatTimeDuration, getTimeTracksByDateRange } from "@/src/app/lib/utils";

export default function ReportByMonth({ timeTracks, from, to }: { timeTracks: TimeTrack[], from: string | undefined, to: string | undefined }) {
    if (!from || !to) {
        return <div>No period selected</div>
    }
    
    const timeTracksByDay = getTimeTracksByDateRange(timeTracks, new Date(from), new Date(to));

    const timeTracksByMonth: { days: string[], trackedTime: number }[] = [];

    timeTracksByDay.forEach(day => {
        const currentDate = day.date; 
        const dayOfMonth = currentDate.getDate();
        const isFirstDayOfMonth = dayOfMonth === 1;

        if (isFirstDayOfMonth || timeTracksByMonth.length < 1) {
            timeTracksByMonth.push({
                days: [],
                trackedTime: 0,
            })
        }

        const currentMonth = timeTracksByMonth.length ? timeTracksByMonth[timeTracksByMonth.length - 1] : null;

        if (currentMonth) {
            currentMonth.days.push(day.day);
            currentMonth.trackedTime += day.duration;
        }
    });

    const sumOfAllDays = timeTracksByDay.reduce((sum, currentDay) => sum + currentDay.duration, 0);
    const avaragePerMonth = sumOfAllDays / timeTracksByMonth.length;

    return (
        <>
            {timeTracksByMonth.length > 0 ? 
            <>
                <div className="max-h-[calc(100dvh-0.75rem-3rem-32px-2rem-39px-1.5rem-1.5rem-0.25rem-44px-1.5rem-3rem-0.75rem)] overflow-auto">
                    <table className="min-w-full text-gray-900 md:table">
                        <thead className="bg-gray-50 font-normal rounded-t-lg shadow sticky text-left text-sm top-0">
                        <tr>
                            <th scope="col" className="px-4 pb-2 font-medium sm:pl-6">
                                Month
                            </th>
                            <th scope="col" className="px-3 pb-2 font-medium">
                                Tracked Time
                            </th>
                            <th scope="col" className="px-3 pb-2 font-medium">
                                Day Avarage
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {timeTracksByMonth?.map((month) => (
                            <tr
                            key={`${month.days[0]} - ${month.days[month.days.length - 1]}`}
                            className="w-full border-b py-3 text-sm last-of-type:border-none"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {`${month.days[0]} - ${month.days[month.days.length - 1]}`}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {formatTimeDuration(month.trackedTime)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {formatTimeDuration(month.trackedTime / month.days.length)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div> 
                <div className="bg-white flex mt-1 px-6 py-3 rounded-b-lg text-sm">
                    <span className="font-medium">Month Avarage:</span><span className='ml-1'>{formatTimeDuration(avaragePerMonth)}</span>
                    <span className="font-medium ml-auto">Total:</span><span className='ml-1'>{formatTimeDuration(sumOfAllDays)}</span>
                </div>
            </>
            : <span className="font-medium text-sm">No months</span>}
        </>
    )
}