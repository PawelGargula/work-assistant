import { UpdateTimeTrack } from '@/src/app/ui/time-tracks/buttons';
import { fetchFilteredTimeTracks } from '@/src/app/lib/data';
import ClientLocalDate from '@/src/app/ui/time-tracks/client-local-time';

export default async function TimeTracksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const timeTracks = await fetchFilteredTimeTracks(query, currentPage);
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
                      Task title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Start
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      End
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900 bg-white">
                  {timeTracks.map((timeTrack) => (
                    <tr key={timeTrack.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        {timeTrack.task.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-sm">
                        <ClientLocalDate date={timeTrack.startTime}/>
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-sm">
                        <ClientLocalDate date={timeTrack.endTime}/>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {timeTrack.endTime && <UpdateTimeTrack id={timeTrack.id} />}
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