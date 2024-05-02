import { CompleteTask, SetTaskStatusAsNotTracking, StartTrackingTask, UpdateTask } from '@/src/app/ui/tasks/buttons';
import { fetchFilteredTasks } from '@/src/app/lib/data';
import clsx from 'clsx';
import { TaskStatus } from '@prisma/client';

export default async function TasksTable({
  query,
  currentPage,
  status,
}: {
  query: string;
  currentPage: number;
  status: TaskStatus | undefined;
}) {
  const tasks = await fetchFilteredTasks(query, currentPage, status);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900 bg-white">
                  {tasks.map((task) => (
                    <tr key={task.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        {task.title}
                      </td>
                      <td className={clsx("whitespace-nowrap px-4 py-5 text-sm", {
                        'text-slate-600': task.status === TaskStatus.NOTTRACKING,
                        'text-green-600': task.status === TaskStatus.TRACKING,
                        'text-violet-700': task.status === TaskStatus.COMPLETED,
                      })}>
                        {task.status === TaskStatus.NOTTRACKING ? "Not tracking" 
                        : task.status === TaskStatus.TRACKING ? "Tracking" 
                        : "Completed"}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {task.status !== TaskStatus.NOTTRACKING && <SetTaskStatusAsNotTracking id={task.id} />}
                          {task.status !== TaskStatus.TRACKING && <StartTrackingTask id={task.id} />}
                          {task.status !== TaskStatus.COMPLETED && <CompleteTask id={task.id} />}
                          <UpdateTask id={task.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
