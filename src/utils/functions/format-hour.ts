export const formatHour = (date: string) => {
    const [hour, minutes] = date.split(':').map(Number);
    const newDate = new Date();
    newDate.setHours(hour, minutes, 0, 0);
    return newDate;
}