'use client';

import { Group } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SelectGroup({ groups }: {groups: Group[]}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
  
    const createPageURL = (group: string) => {
        const params = new URLSearchParams(searchParams);
        if (group) {
            params.set('group', group);
        } else {
            params.delete('group');
        }
        replace(`${pathname}?${params.toString()}`);
    };
  
  return (
    <>
        <select 
            aria-label="Group" 
            className="border border-gray-200 cursor-pointer focus-visible:outline-violet-500 p-2 rounded-md text-sm"
            defaultValue={searchParams.get("group")?.toString()}
            id="group" 
            name="group" 
            onChange={(e) => createPageURL(e.target.value)}
        >
            <option value="">Filter by Group (All)</option>
            {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
        </select>
    </>
  )
}
