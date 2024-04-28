import clsx from 'clsx';
import { fetchLatestTasks } from '@/src/app/lib/data';
import { TaskStatus } from '@prisma/client';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default async function LatestTasks() {
  const latestTasks = await fetchLatestTasks();
  return (
    <div className="flex w-full flex-col">
      <div className="flex grow flex-col rounded-xl bg-gray-50 p-4">
        <div className="flex p-4 pl-2 pt-2">
            <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Latest Tasks</h3>
        </div>
        <div className="bg-white divide-y px-6">
          {latestTasks.map((task, i) => {
            return (
              <div
                key={task.id}
                className='flex flex-row items-center justify-between gap-4 py-4 text-sm'
              >
                <p className="truncate">
                    {task.title}
                </p>
                <p className={clsx("min-w-[82px] text-right", {
                    'text-slate-600': task.status === TaskStatus.NOTTRACKING,
                    'text-green-600': task.status === TaskStatus.TRACKING,
                    'text-violet-700': task.status === TaskStatus.COMPLETED,
                })}>
                  {task.status === TaskStatus.NOTTRACKING ? "Not tracking" 
                    : task.status === TaskStatus.TRACKING ? "Tracking" 
                    : "Completed"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
