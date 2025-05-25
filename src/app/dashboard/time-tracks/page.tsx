import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { fetchTimeTracksPages } from '@/src/app/lib/data';
import Search from '@/src/app/ui/search';
import { Suspense } from 'react';
import Table from '@/src/app/ui/time-tracks/table';
import { TimeTracksTableSkeleton } from '@/src/app/ui/skeletons';
import Pagination from '@/src/app/ui/tasks/pagination';

export const metadata: Metadata = {
    title: 'Time tracks',
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

    const totalPages = await fetchTimeTracksPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-xl md:text-2xl'>Time tracks</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search time tracks..." />
            </div>
            <Suspense key={query + currentPage} fallback={<TimeTracksTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}