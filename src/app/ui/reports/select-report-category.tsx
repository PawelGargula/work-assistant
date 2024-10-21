'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ReportCategory } from '@/src/app/ui/reports/report-category';

export default function SelectReportCategory() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
  
    const createPageURL = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status) {
            params.set('category', status);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    };
  
  return (
    <>
        <select 
            aria-label="Report category" 
            className="border border-gray-200 cursor-pointer focus-visible:outline-violet-500 p-2 rounded-md text-sm"
            defaultValue={searchParams.get("category")?.toString()}
            id="category" 
            name="category" 
            onChange={(e) => createPageURL(e.target.value)}
        >
            <option value="">--Select category--</option>
            <option value={ReportCategory.DAY}>Day</option>
            <option value={ReportCategory.WEEK}>Week</option>
            <option value={ReportCategory.MONTH}>Month</option>
            <option value={ReportCategory.TASK}>Task</option>
        </select>
    </>
  )
}
