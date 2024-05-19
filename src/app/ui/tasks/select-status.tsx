'use client';

import { TaskStatus } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SelectStatus() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const createPageURL = (status: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (status) {
            params.set('status', status);
        } else {
            params.delete('status');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <>
            <select 
                aria-label="Filter by Status" 
                className="border border-gray-200 focus-visible:outline-violet-500 p-1 rounded-md text-sm"
                defaultValue={searchParams.get("status")?.toString()}
                id="status-select" 
                name="status" 
                onChange={(e) => createPageURL(e.target.value)}
            >
                <option value="">Filter by Status (All)</option>
                <option value={TaskStatus.NOTTRACKING}>Not tracking</option>
                <option value={TaskStatus.TRACKING}>Tracking</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
            </select>
        </>
    )
}