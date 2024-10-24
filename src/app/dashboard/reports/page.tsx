import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SelectReportCategory from '@/src/app/ui/reports/select-report-category';
import ReportPeriodPicker from '@/src/app/ui/reports/report-period-picker';
import { fetchTimeTracksByDateRange } from '@/src/app/lib/data';
import { ReportCategory } from '@/src/app/ui/reports/report-category';
import ReportByDay from '@/src/app/ui/reports/report-by-day';
import ReportByWeek from '@/src/app/ui/reports/report-by-week';
import ReportByMonth from '@/src/app/ui/reports/report-by-month';
import ReportByTask from '@/src/app/ui/reports/report-by-task';
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/src/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Reports',
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: {
      from?: string;
      to?: string;
      category?: string;
  }
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");

  const from = searchParams?.from;
  const to = searchParams?.to;
  const category = searchParams?.category;
  const timeTracks = await fetchTimeTracksByDateRange(from, to);

  return (
    <main>
        <h1 className="mb-4 text-xl md:text-2xl md:mb-8">
            Reports
        </h1>

        <div className='flex gap-3 flex-wrap mb-4 md:mb-6'>
          <SelectReportCategory />
          <ReportPeriodPicker />
        </div>

        {category && to && from && <div className="bg-gray-50 md:p-6 p-4 rounded-md">
          {category === ReportCategory.DAY && (
            <Suspense fallback={<ReportTableSkeleton />}>
              <ReportByDay timeTracks={timeTracks} from={from} to={to} />
            </Suspense>
          )}

          {category === ReportCategory.WEEK && (
            <Suspense fallback={<ReportTableSkeleton />}>
              <ReportByWeek timeTracks={timeTracks} from={from} to={to} />
            </Suspense>
          )}
          
          {category === ReportCategory.MONTH && (
            <Suspense fallback={<ReportTableSkeleton />}>
              <ReportByMonth timeTracks={timeTracks} from={from} to={to} />
            </Suspense>
          )}

          {category === ReportCategory.TASK && (
            <Suspense fallback={<ReportTableSkeleton />}>
              <ReportByTask timeTracks={timeTracks} from={from} to={to} />
            </Suspense>
          )}
        </div>}
    </main>
  )
}