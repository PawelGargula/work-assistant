import { TimeTrack } from "@prisma/client";

export const formatDateToLocal = (date: Date | null) => {
    return date ?
        new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
        : "-"
};

export const formatDateForDateTimeLocalInput = (date: Date | null) => {
  if(!date) return "";
  const serverDateTime = new Date(date);
  const year = serverDateTime.getFullYear().toString().padStart(4, '0');
  const month = (serverDateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = serverDateTime.getDate().toString().padStart(2, '0');
  const hours = serverDateTime.getHours().toString().padStart(2, '0');
  const minutes = serverDateTime.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDateTime;
}

export const getTimeDuration = (startTime: Date, endTime: Date | null) => {
    endTime = endTime ?? new Date();
    const duration = +endTime - +startTime;
    return duration;
}

export const formatTimeDuration = (duration: number) => {
    const hours = Math.floor((duration / (1000 * 60 * 60)));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`
};

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
  
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

export const getTimeTracksByDateRange = (timeTracks: TimeTrack[], from: Date, to: Date) => {
  const timeTracksByDay: {day: string, duration: number, date: Date}[] = [];
  const currentDate = new Date(from);
  const endDate = new Date(to);

  while (currentDate <= endDate) {
    timeTracksByDay.push({
      day: new Date(currentDate).toLocaleDateString(),
      duration: 0,
      date: new Date(currentDate)
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

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

  return timeTracksByDay;
};

export const getTasksTimeTracksByDateRange = (
  timeTracks: ({
    task: {
      title: string;
    };
  } & TimeTrack)[],
  from: Date, 
  to: Date
) => {
  // Add one day to include the entire day
  if (to) {
    const toDate = new Date(to);
    to = new Date(toDate.setDate(toDate.getDate() + 1));
  }

  const tasksTimeTracks = Array.from(new Set(timeTracks.map(timeTrack => timeTrack.taskId)))
    .map(taskId => {
      const task = timeTracks.find(timeTrack => timeTrack.taskId === taskId)?.task;
      return {
        taskId: taskId,
        taskTitle: task?.title || '',
        duration: 0
      };
    });

  timeTracks.forEach(timeTrack => {
    if (timeTrack.startTime < from) {
      timeTrack.startTime = from;
    }

    if (timeTrack.endTime === null) {
      timeTrack.endTime = new Date();
    }

    if (timeTrack.endTime > to) {
      timeTrack.endTime = to;
    }
    
    const task = tasksTimeTracks.find(task => task.taskId === timeTrack.taskId);
    if (task) {
      task.duration += getTimeDuration(timeTrack.startTime, timeTrack.endTime);
    }
  });

  tasksTimeTracks.sort((a, b) => b.duration - a.duration);
  
  return tasksTimeTracks;
};