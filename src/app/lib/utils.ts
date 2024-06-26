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