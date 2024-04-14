import { TimeTrack } from "@prisma/client";
import { formatDateToLocal, formatTimeDuration, getTimeDuration } from "../../lib/utils";

export default function TimeTracks({
    timeTracks,
    plannedCompletionTime
}: {
    timeTracks: TimeTrack[],
    plannedCompletionTime: number
}) {
    const timeTracksWithDuration = timeTracks.map(timeTrack => ({
        ...timeTrack,
        duration: getTimeDuration(timeTrack.startTime, timeTrack.endTime)
    }));

    const durationSum = timeTracksWithDuration.reduce((sum, currentTimeTrack) => sum + currentTimeTrack.duration, 0);
    const plannedCompletionTimeInMs = plannedCompletionTime * 60 * 1000;
    const progress = durationSum && plannedCompletionTimeInMs && Math.floor(durationSum / plannedCompletionTimeInMs * 100);
    return (<>
        {progress && <div className="bg-gray-50 md:p-6 p-4 rounded-md mb-4">
            <label htmlFor="tracked-planned" className='font-medium text-sm mb-1'>{progress}% (Tracked / Planned)</label>
            <progress id="tracked-planned" className="w-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:bg-violet-500 [&::-webkit-progress-value]:rounded-lg [&::-moz-progress-bar]:bg-violet-500 [&::-moz-progress-bar]:rounded-lg" max={100} value={progress} aria-label='tracked/planned'>{progress}</progress>
        </div>}
        <div className="bg-gray-50 md:p-6 p-4 rounded-md">
            <div className="overflow-auto">
                <table className="min-w-full text-gray-900 md:table">
                    <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-1 font-medium sm:pl-6">
                            Start
                        </th>
                        <th scope="col" className="px-3 py-1 font-medium">
                            End
                        </th>
                        <th scope="col" className="px-3 py-1 font-medium">
                            Duration
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {timeTracksWithDuration?.map((timeTrack) => (
                        <tr
                        key={timeTrack.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                {formatDateToLocal(timeTrack.startTime)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                {formatDateToLocal(timeTrack.endTime)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                {formatTimeDuration(timeTrack.duration)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="bg-white">
                        <tr className="w-full border-t py-3 text-sm rounded-bl-lg rounded-br-lg">
                            <th className="font-medium px-3 py-1 text-right" scope="row" colSpan={2}>
                                Sum
                            </th>
                            <td className="whitespace-nowrap px-3 py-3">
                                {formatTimeDuration(durationSum)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
      </div>
    </>
    )
}