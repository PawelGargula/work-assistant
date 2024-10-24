'use client';

import 'rsuite/dist/rsuite-no-reset.min.css';
import '@/src/app/ui/reports/rs-primary-color.css';
import { DateRangePicker } from 'rsuite';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ReportCategory } from '@/src/app/ui/reports/report-category';

export default function ReportPeriodPicker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
  
    const createPageURL = (value: Date[] | null) => {
        const params = new URLSearchParams(searchParams);
        if (value && value[0] && value[1]) {
            const fromDate = value[0].toISOString();
            const toDate = value[1].toISOString();
            params.set('from', fromDate);
            params.set('to', toDate);
        } else {
            params.delete('from');
            params.delete('to');
        }
        
        replace(`${pathname}?${params.toString()}`);
    };

    const category = searchParams.get('category');

    return (
        <>
            <DateRangePicker 
                defaultValue={
                    searchParams.get('from') && searchParams.get('to') ? 
                    [
                        new Date(searchParams.get('from')!),
                        new Date(searchParams.get('to')!)
                    ] 
                    : null
                }
                placeholder="Select period" 
                onChange={(value) => createPageURL(value)}
                format="dd.MM.yyyy"
                hoverRange={category === ReportCategory.WEEK ? "week" : category === ReportCategory.MONTH ? "month" : undefined} 
                isoWeek
            />
        </>
    );
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