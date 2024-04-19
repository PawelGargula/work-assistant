export function TasksTableSkeleton() {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <TaskTableRowSkeleton />
                <TaskTableRowSkeleton />
                <TaskTableRowSkeleton />
                <TaskTableRowSkeleton />
                <TaskTableRowSkeleton />
                <TaskTableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export function TaskTableRowSkeleton() {
    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        {/* Title */}
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Status */}
        <td className="whitespace-nowrap px-3 py-3">
            <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
            <div className="flex justify-end gap-3">
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            </div>
        </td>
        </tr>
    );
}

export function TimeTracksTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
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
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TimeTrackTableRowSkeleton />
              <TimeTrackTableRowSkeleton />
              <TimeTrackTableRowSkeleton />
              <TimeTrackTableRowSkeleton />
              <TimeTrackTableRowSkeleton />
              <TimeTrackTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TimeTrackTableRowSkeleton() {
  return (
      <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Task title */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Start */}
      <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* End */}
      <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Edit */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          </div>
      </td>
      </tr>
  );
}