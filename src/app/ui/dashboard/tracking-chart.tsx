'use client'
import { CalendarIcon } from '@heroicons/react/24/outline';
import { TimeTrack } from '@prisma/client';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import { formatTimeDuration } from '@/src/app/lib/utils';
import { getTimeTracksByDateRange } from '@/src/app/lib/utils';

export default function TrackingChart({
  timeTracks
} : {
  timeTracks: TimeTrack[]
}) {
  const sevenDaysBeforeAtZeroHour = new Date(new Date().setDate(new Date().getDate() - 6)).setHours(0,0,0,0);
  const timeTracksByDay = getTimeTracksByDateRange(timeTracks, new Date(sevenDaysBeforeAtZeroHour), new Date()); 

  const sumOfAllDays = timeTracksByDay.reduce((sum, currentDay) => sum + currentDay.duration, 0);
  const avaragePerDay = sumOfAllDays / timeTracksByDay.length;

  return (
    <div className="w-full">
      {<div className="rounded-xl bg-gray-50 p-4">
        <div className="flex p-4 pl-2 pt-2">
            <CalendarIcon className="h-5 w-5 text-gray-700" />
            <h3 className="font-medium ml-2 text-sm">Time tracks by last 7 days</h3>
        </div>
        <ResponsiveContainer className='bg-white p-6 pb-0 pl-0 rounded-t-xl text-sm' width="100%" height="100%" minHeight={350}>
          <BarChart data={timeTracksByDay}>
            <XAxis dataKey="day" tickFormatter={(value) => new Date().toLocaleDateString() === value ? 'Today' : value}/>
            <YAxis tickFormatter={value => formatTimeDuration(value)} />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              formatter={(value) => formatTimeDuration(Number(value))}
            />
            <Bar 
              dataKey="duration" 
              fill="#c4b5fd" 
              name="Tracked"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="bg-white flex mt-1 px-8 py-3 rounded-b-xl text-sm">
            <span className="font-medium">Avarage:</span><span className='ml-1'>{formatTimeDuration(avaragePerDay)}</span>
            <span className="font-medium ml-auto">Total:</span><span className='ml-1'>{formatTimeDuration(sumOfAllDays)}</span>
        </div>
      </div>}
    </div>
  );
}