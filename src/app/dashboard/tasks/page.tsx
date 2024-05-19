import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { fetchTasksPages } from '@/src/app/lib/data';
import Search from '@/src/app/ui/search';
import { CreateTask } from '@/src/app/ui/tasks/buttons';
import { Suspense } from 'react';
import Table from '@/src/app/ui/tasks/table';
import { TasksTableSkeleton } from '@/src/app/ui/skeletons';
import Pagination from '@/src/app/ui/tasks/pagination';
import SelectStatus from '@/src/app/ui/tasks/select-status';
import { TaskStatus } from '@prisma/client';

export const metadata: Metadata = {
    title: 'Tasks',
}

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
        status?: TaskStatus;
    }
}) {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    !isLoggedIn && redirect("/");

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const status = searchParams?.status;

    const totalPages = await fetchTasksPages(query, status);

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className='text-xl md:text-2xl'>Tasks</h1>
            <SelectStatus />
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search tasks..." />
            <CreateTask />
        </div>
        <Suspense key={query + currentPage} fallback={<TasksTableSkeleton />}>
            <Table query={query} currentPage={currentPage} status={status} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
        </div>
    );
}