import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { fetchGroupsPages } from '@/src/app/lib/data';
import Search from '@/src/app/ui/search';
import { Suspense } from 'react';
import Table from '@/src/app/ui/groups/table';
import { GroupsTableSkeleton } from '@/src/app/ui/skeletons';
import Pagination from '@/src/app/ui/tasks/pagination';
import { CreateGroup } from '@/src/app/ui/groups/buttons';

export const metadata: Metadata = {
    title: 'Groups',
}

export default async function Page(
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>
    }
) {
    const searchParams = await props.searchParams;
    const session = await auth();
    const isLoggedIn = !!session?.user;
    !isLoggedIn && redirect("/");

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchGroupsPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-xl md:text-2xl'>Groups</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search groups..." />
                <CreateGroup />
            </div>
            <Suspense key={query + currentPage} fallback={<GroupsTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}