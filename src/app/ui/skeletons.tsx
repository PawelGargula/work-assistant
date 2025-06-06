// Dashboard
// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardsSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <TrackingChartSkeleton />
        <LatestTasksSkeleton />
      </div>
    </>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-50 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-32 rounded-md bg-gray-200" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function TrackingChartSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-50 shadow-sm`}
    >
      <div className="w-full">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex p-4 pl-2 pt-2">
            <div className="h-5 w-5 rounded-md bg-gray-200" />
            <div className="ml-2 h-6 w-64 rounded-md bg-gray-200" />
          </div>
          <div className='bg-white h-[350px] p-6 pb-3 pl-0 rounded-xl w-full'></div>
          <div className="bg-white flex mt-1 px-8 py-3 rounded-b-xl">
            <div className="h-6 w-32 rounded-md bg-gray-200" />
            <div className="h-6 ml-auto w-32 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LatestTasksSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-50 shadow-sm`}
    >
      <div className="flex w-full flex-col">
        <div className="flex grow flex-col rounded-xl bg-gray-50 p-4">
          <div className="flex p-4 pl-2 pt-2">
            <div className="h-5 w-5 rounded-md bg-gray-200" />
            <div className="ml-2 h-6 w-32 rounded-md bg-gray-200" />
          </div>
          <div className="bg-white divide-y px-6">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export function TaskSkeleton() {
  return (
    <div className={`flex flex-row items-center justify-between gap-4 py-4 text-sm`}>
      <p className="h-5 w-1/2 bg-gray-200"></p>
      <p className="h-5 w-1/4 bg-gray-200"></p>
    </div>
  );
}

// Tasks
export function TasksSkeleton() {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <div
          className={`${shimmer} relative h-8 w-36 overflow-hidden rounded-md bg-gray-50`}
        />
        <div className='flex gap-2 items-center'>
            <div className={`${shimmer} bg-gray-50 h-[30px] md:w-[78px] overflow-hidden relative rounded-md`}></div>
            <div className={`${shimmer} bg-gray-50 h-[30px] md:w-[160px] overflow-hidden relative rounded-md`}></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 mb-4 md:mt-8">
          <div className={`${shimmer} bg-gray-50 flex-1 flex-shrink-0 h-[40px] overflow-hidden relative rounded-md`}></div>
          <div className={`${shimmer} bg-gray-50 h-[40px] md:w-[157px] overflow-hidden relative rounded-md w-[52px]`}></div>
      </div>
      <TasksTableSkeleton />
    </>
  );
}

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
                  <th scope="col" className="px-3 py-5 font-medium">
                    Group
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
        <td className="relative overflow-hidden whitespace-nowrap py-[23px] pl-6 pr-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Status */}
        <td className="whitespace-nowrap px-3 py-[23px]">
            <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Group */}
        <td className="whitespace-nowrap px-3 py-[23px]">
            <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
            <div className="flex justify-end gap-3">
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            </div>
        </td>
        </tr>
    );
}

export function CreateTaskSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-72 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />

      <div className={`${shimmer} relative overflow-hidden bg-gray-50 md:p-6 p-4 rounded-md`}>
        <div className="space-y-4">
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-16 rounded-md" />
            <div className="bg-gray-200 h-[42px] rounded-md w-full" />
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-20 rounded-md" />
            <div className="bg-gray-200 h-[42px] mb-2 rounded-t-md w-full" />
            <div className="bg-gray-200 h-[256px] rounded-b-md w-full" />
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-36 rounded-md" />
            <div className="flex gap-1">
              <div>
                <div className="bg-gray-200 h-[18px] mb-2 w-12 rounded-md" />
                <div className="bg-gray-200 h-[42px] rounded-md w-20" />
              </div>
              <div>
                <div className="bg-gray-200 h-[18px] mb-2 w-12 rounded-md" />
                <div className="bg-gray-200 h-[42px] rounded-md w-20" />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-16 rounded-md" />
            <div className="bg-gray-200 h-[42px] rounded-md w-[135px]" />
          </div>
        </div>
      </div>

      <div className={`${shimmer} relative overflow-hidden mt-6 flex justify-end gap-4`}>
        <div className="bg-gray-50 h-10 w-[78px] rounded-md"></div>
        <div className="bg-gray-50 h-10 w-[121px] rounded-md"></div>
      </div>

    </>
  );
}

export function EditTaskSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-72 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />

      <div
        className={`${shimmer} relative mb-3 h-[40px] w-[173px] overflow-hidden rounded-full bg-gray-50`}
      />

      <div className={`${shimmer} relative overflow-hidden bg-gray-50 md:p-6 p-4 rounded-md`}>
        <div className="space-y-4">
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-16 rounded-md" />
            <div className="flex flex-wrap gap-3">
              <div className="bg-gray-200 h-[40px] w-[145px] rounded-md" />
              <div className="bg-gray-200 h-[40px] w-[145px] rounded-md" />
              <div className="bg-gray-200 h-[40px] w-[145px] rounded-md" />
            </div>
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-16 rounded-md" />
            <div className="bg-gray-200 h-[42px] rounded-md w-full" />
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-20 rounded-md" />
            <div className="bg-gray-200 h-[42px] mb-2 rounded-t-md w-full" />
            <div className="bg-gray-200 h-[256px] rounded-b-md w-full" />
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-36 rounded-md" />
            <div className="flex gap-1">
              <div>
                <div className="bg-gray-200 h-[18px] mb-2 w-12 rounded-md" />
                <div className="bg-gray-200 h-[42px] rounded-md w-20" />
              </div>
              <div>
                <div className="bg-gray-200 h-[18px] mb-2 w-12 rounded-md" />
                <div className="bg-gray-200 h-[42px] rounded-md w-20" />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-16 rounded-md" />
            <div className="bg-gray-200 h-[42px] rounded-md w-[135px]" />
          </div>
        </div>
      </div>

      <div className={`${shimmer} relative overflow-hidden mt-6 flex justify-end gap-4`}>
        <div className="bg-gray-50 h-10 w-[78px] rounded-md"></div>
        <div className="bg-gray-50 h-10 w-[121px] rounded-md"></div>
      </div>

    </>
  );
}

// Time tracks
export function TimeTracksSkeleton() {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <div
          className={`${shimmer} relative h-8 w-36 overflow-hidden rounded-md bg-gray-50`}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 mb-4 md:mt-8">
          <div className={`${shimmer} bg-gray-50 flex-1 flex-shrink-0 h-[40px] overflow-hidden relative rounded-md`}></div>
      </div>
      <TimeTracksTableSkeleton />
    </>
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

export function EditTimeTrackSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-72 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />

      <div className={`${shimmer} relative overflow-hidden bg-gray-50 md:p-6 p-4 rounded-md`}>
        <div className="space-y-4">
          <div>
            <div className="bg-gray-200 h-[20px] mb-2 w-48 rounded-md" />
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="w-full md:w-fit">
              <div className="bg-gray-200 h-[18px] mb-2 w-12 rounded-md" />
              <div className="bg-gray-200 h-[42px] rounded-md w-full md:w-[220px]" />
            </div>
            <div className="w-full md:w-fit">
              <div className="bg-gray-200 h-[18px] mb-2 w-8 rounded-md" />
              <div className="bg-gray-200 h-[42px] rounded-md w-full md:w-[220px]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`${shimmer} relative overflow-hidden mt-6 flex justify-end gap-4`}>
        <div className="bg-gray-50 h-10 w-[78px] rounded-md"></div>
        <div className="bg-gray-50 h-10 w-[140px] rounded-md"></div>
      </div>
    </>
  );
}

// Account
export function AccountSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-24 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />
      <div className={`${shimmer} relative overflow-hidden bg-gray-50 md:p-6 p-4 rounded-md`}>
        <div className="space-y-4">
          {/* Email preview skeleton */}
          <div className="flex gap-2 items-center">
            <div className="bg-gray-200 h-[40px] w-[40px] rounded-md" />
            <div className="bg-gray-200 h-[20px] w-12 rounded-md" />
            <div className="bg-gray-200 h-[20px] w-48 rounded-md" />
          </div>
          {/* Delete account button skeleton */}
          <div className="mt-4">
            <div className="bg-gray-200 h-10 w-[140px] rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
}

// Terms of Service
export function TermsOfServiceSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-80 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />
      <div className={`${shimmer} relative overflow-hidden bg-gray-50 divide-y md:px-6 md:py-2 px-4 py-2 rounded-md`}>
        {/* Section skeletons */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="py-2 space-y-2">
            {/* Section heading */}
            <div className="bg-gray-200 h-[20px] w-32 rounded-md" />
            {/* Section content lines */}
            <div className="bg-gray-200 h-[16px] w-full rounded-md" />
            <div className="bg-gray-200 h-[16px] w-3/4 rounded-md" />
            {index % 3 === 0 && (
              <>
                <div className="bg-gray-200 h-[16px] w-5/6 rounded-md" />
                <div className="bg-gray-200 h-[16px] w-2/3 rounded-md" />
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// Groups
export function GroupsSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />
      <div className="mt-4 flex items-center justify-between gap-2 mb-4 md:mt-8">
          <div className={`${shimmer} bg-gray-50 flex-1 flex-shrink-0 h-[40px] overflow-hidden relative rounded-md`}></div>
          <div className={`${shimmer} bg-gray-50 h-[40px] md:w-[157px] overflow-hidden relative rounded-md w-[52px]`}></div>
      </div>
      <GroupsTableSkeleton />
    </>
  );
}

export function GroupsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
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
              <GroupsTableRowSkeleton />
              <GroupsTableRowSkeleton />
              <GroupsTableRowSkeleton />
              <GroupsTableRowSkeleton />
              <GroupsTableRowSkeleton />
              <GroupsTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function GroupsTableRowSkeleton() {
  return (
      <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        {/* Name */}
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Edit */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
            <div className="flex justify-end gap-3">
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
              <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            </div>
        </td>
      </tr>
  );
}

export function GroupSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-72 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />

      <div className={`${shimmer} relative overflow-hidden bg-gray-50 md:p-6 p-4 rounded-md`}>
        <div className="mb-4">
          <div className="bg-gray-200 h-[20px] mb-2 ml-2 w-16 rounded-md" />
          <div className="bg-gray-200 h-[42px] ml-2 rounded-md w-full"></div>
        </div>
      </div>
      
      <div className={`${shimmer} relative overflow-hidden mt-6 flex justify-end gap-4`}>
        <div className="bg-gray-50 h-10 w-[78px] rounded-md"></div>
        <div className="bg-gray-50 h-10 w-[121px] rounded-md"></div>
      </div>
    </>
  );
}

// Reports
export function ReportsSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-50 md:mb-8`}
      />
      <div className='flex gap-3 flex-wrap mb-4 md:mb-6'>
        <div className={`${shimmer} bg-gray-100 flex items-center h-[39px] overflow-hidden relative w-[157px] rounded`}>
          <div className="bg-white h-[7px] ml-auto mr-3 w-[14px]"></div>
        </div>
        <div className={`${shimmer} bg-gray-100 flex items-center h-[39px] overflow-hidden relative w-[157px] rounded`}>
          <div className="bg-white h-[7px] ml-auto mr-3 w-[14px]"></div>
        </div>
        <div className={`${shimmer} bg-gray-100 flex items-center h-[39px] overflow-hidden relative w-[255px] rounded`}>
          <div className="bg-white h-[14px] ml-auto mr-3 w-[14px]"></div>
        </div>
      </div>
      <div className="bg-gray-50 md:p-6 p-4 rounded-md">
        <ReportTableSkeleton />
      </div>
    </>
  );
}

export function ReportTableSkeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative`}>
      <div>
        <table className="min-w-full text-gray-900 md:table">
            <thead className="bg-gray-50 font-normal rounded-t-lg shadow text-left text-sm">
              <tr>
                  <th scope="col" className="px-4 pb-2 font-medium sm:pl-6">
                    <div className="h-[1.25rem] w-16 rounded-md bg-gray-200" />
                  </th>
                  <th scope="col" className="px-3 pb-2 font-medium">
                    <div className="h-[1.25rem] w-32 rounded-md bg-gray-200" />
                  </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <ReportTableRowSkeleton />
              <ReportTableRowSkeleton />
              <ReportTableRowSkeleton />
              <ReportTableRowSkeleton />
              <ReportTableRowSkeleton />
              <ReportTableRowSkeleton />
            </tbody>
        </table>
      </div> 
      <div className="bg-white flex mt-1 px-6 py-3 rounded-b-lg text-sm">
          <div className="h-[1.25rem] w-32 rounded-md bg-gray-200" />
          <div className="h-[1.25rem] ml-auto w-32 rounded-md bg-gray-200" />
      </div>
  </div>
  );
}

function ReportTableRowSkeleton() {
  return (
    <tr
      className="w-full border-b py-3 text-sm last-of-type:border-none"
    >
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="h-[1.25rem] w-24 rounded bg-gray-200"></div>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-[1.25rem] w-16 rounded bg-gray-200"></div>
        </td>
    </tr>
  );
}