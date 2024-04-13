export const formatDateToLocal = (date: Date | null) => {
    return date ?
        new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
        : "-"
};

export const getTimeDuration = (startTime: Date, endTime: Date | null) => {
    endTime = endTime ?? new Date();
    const duration = +endTime - +startTime;
    return duration;
}

export const formatTimeDuration = (duration: number) => {
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`
};