"use client";

import { TimeTrack } from "@prisma/client";
import { formatTimeDuration, getTasksTimeTracksByDateRange } from "@/src/app/lib/utils";

export default function ReportByTask(
    { timeTracks, from, to }: 
    { 
        timeTracks: ({
            task: {
                title: string;
            };
        } & TimeTrack)[],
        from: string | undefined, 
        to: string | undefined 
    }
) {
    if (!from || !to) {
        return <div>No period selected</div>
    }
    
    const tasksTimeTracks: {
        taskId: string;
        taskTitle: string;
        duration: number;
    }[] = getTasksTimeTracksByDateRange(timeTracks, new Date(from), new Date(to));

    const sumOfTasks = tasksTimeTracks.reduce((sum, currentTask) => sum + currentTask.duration, 0);
    const avaragePerDay = sumOfTasks / tasksTimeTracks.length;

    return (
        <>
            {tasksTimeTracks.length > 0 ? 
            <>
                <div className="max-h-[calc(100dvh-0.75rem-3rem-32px-2rem-39px-1.5rem-1.5rem-0.25rem-44px-1.5rem-3rem-0.75rem)] overflow-auto">
                    <table className="min-w-full text-gray-900 md:table">
                        <thead className="bg-gray-50 font-normal rounded-t-lg shadow sticky text-left text-sm top-0">
                        <tr>
                            <th scope="col" className="px-4 pb-2 font-medium sm:pl-6">
                                Task
                            </th>
                            <th scope="col" className="px-3 pb-2 font-medium">
                                Tracked Time
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {tasksTimeTracks?.map((task) => (
                            <tr
                            key={task.taskId}
                            className="w-full border-b py-3 text-sm last-of-type:border-none"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {task.taskTitle}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {formatTimeDuration(task.duration)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div> 
                <div className="bg-white flex mt-1 px-6 py-3 rounded-b-lg text-sm">
                    <span className="font-medium">Task Avarage:</span><span className='ml-1'>{formatTimeDuration(avaragePerDay)}</span>
                    <span className="font-medium ml-auto">Total:</span><span className='ml-1'>{formatTimeDuration(sumOfTasks)}</span>
                </div>
            </>
            : <span className="font-medium text-sm">No tasks</span>}
        </>
    )
}