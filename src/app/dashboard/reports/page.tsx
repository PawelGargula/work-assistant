import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SelectReportCategory from '@/src/app/ui/reports/select-report-category';
import ReportPeriodPicker from '@/src/app/ui/reports/report-period-picker';
import { fetchTimeTracksByDateRange } from '@/src/app/lib/data';
import { ReportCategory } from '@/src/app/ui/reports/report-category';
import ReportByDay from '@/src/app/ui/reports/report-by-day';

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

  console.log(timeTracks);

  return (
    <main>
        <h1 className="mb-4 text-xl md:text-2xl md:mb-8">
            Reports
        </h1>

        <div className='flex gap-3 flex-wrap mb-4 md:mb-6'>
          <SelectReportCategory />
          <ReportPeriodPicker />
        </div>

        <div className="bg-gray-50 md:p-6 p-4 rounded-md">
          {category === ReportCategory.DAY && (<ReportByDay timeTracks={timeTracks} from={from} to={to} />)}
        </div>
    </main>
  )
}

// React Suite Licence. Here I use DateRangePicker
// The MIT License (MIT)

// Copyright (c) 2016-present React Suite Team.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.