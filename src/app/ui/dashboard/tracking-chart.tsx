'use client'
import { CalendarIcon } from '@heroicons/react/24/outline';
import { TimeTrack } from '@prisma/client';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import { formatTimeDuration, getTimeDuration } from '@/src/app/lib/utils';

export default function TrackingChart({
  timeTracks
} : {
  timeTracks: TimeTrack[]
}) {
  const timeTracksByDay = [
    { 
      day: new Date(Date.now() - (6 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      duration: 0,
    },
    { 
      day: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      duration: 0,
    },
    { 
      day: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      duration: 0,
    },
    { 
      day: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      duration: 0,
    },
    { 
      day: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      duration: 0,
    },
    { 
      day: new Date(Date.now() - (24 * 60 * 60 * 1000)).toLocaleDateString(),
      duration: 0,
    },
    { 
      day: new Date().toLocaleDateString(),
      duration: 0,
    }
  ];

  timeTracks.forEach(({startTime, endTime}) => {
    if (startTime.toLocaleDateString() === endTime?.toLocaleDateString() 
      || (endTime === null && startTime.toLocaleDateString() === new Date().toLocaleDateString())) {
        const timeTrackByDay = timeTracksByDay.find(timeTrackByDay => timeTrackByDay.day === startTime.toLocaleDateString());
        timeTrackByDay && (timeTrackByDay!.duration += getTimeDuration(startTime, endTime));    
    } else {
      let currentDay = new Date(startTime);
      !endTime && (endTime = new Date());
      while(currentDay < endTime) {
        const nextDayStart = new Date(currentDay).setHours(0,0,0,0) + (24 * 60 * 60 * 1000);
        const endOfCurrentDay = new Date(Math.min(nextDayStart, Number(new Date(endTime))));
        const timeTrackByDay = timeTracksByDay.find(timeTrackByDay => timeTrackByDay.day === currentDay.toLocaleDateString());
        timeTrackByDay && (timeTrackByDay!.duration += getTimeDuration(currentDay, endOfCurrentDay));
        currentDay = endOfCurrentDay;
      }
    }
  });

  return (
    <div className="w-full">
      {<div className="rounded-xl bg-gray-50 p-4">
        <div className="flex p-4 pl-2 pt-2">
            <CalendarIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Time tracks by last 7 days</h3>
        </div>
        <ResponsiveContainer className='bg-white p-6 pb-3 pl-0 rounded-xl text-sm' width="100%" height="100%" minHeight={350}>
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
        </ ResponsiveContainer>
      </div>}
    </div>
  );
}
