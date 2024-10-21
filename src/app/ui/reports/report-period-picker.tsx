'use client';

import 'rsuite/dist/rsuite-no-reset.min.css';
import '@/src/app/ui/reports/rs-primary-color.css';
import { DateRangePicker } from 'rsuite';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

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
            />
        </>
    );
}
