import { TimeTrack } from "@prisma/client";
import { formatDateToLocal, formatTimeDuration, getTimeDuration } from "../../lib/utils";

export default function TimeTracks({
    timeTracks
}: {
    timeTracks: TimeTrack[]
}) {
    const timeTracksWithDuration = timeTracks.map(timeTrack => ({
        ...timeTrack,
        duration: getTimeDuration(timeTrack.startTime, timeTrack.endTime)
    }));
    return (
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
                </table>
            </div>
      </div>
    )
}