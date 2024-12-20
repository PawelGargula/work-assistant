import CardWrapper from '@/src/app/ui/dashboard/cards';
import TrackingChart from '@/src/app/ui/dashboard/tracking-chart';
import { Suspense } from 'react';
import { CardsSkeleton, TrackingChartSkeleton, LatestTasksSkeleton } from '@/src/app/ui/skeletons';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { fetchLatestTimeTracks } from '@/src/app/lib/data';
import LatestTasks from '@/src/app/ui/dashboard/latest-tasks';

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Page() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    !isLoggedIn && redirect("/");

    const latestTimeTracks = await fetchLatestTimeTracks();

    return (
    <main>
        <h1 className="mb-4 text-xl md:text-2xl md:mb-8">
            Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<CardsSkeleton />}>
                <CardWrapper />
            </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Suspense fallback={<TrackingChartSkeleton />}>
                <TrackingChart timeTracks={latestTimeTracks}/>
            </Suspense>
            <Suspense fallback={<LatestTasksSkeleton />}>
                <LatestTasks />
            </Suspense>
        </div>
    </main>
    );
}