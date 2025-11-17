import { weekDays } from "../transport/schedules/_components/NewScheduleForm";

export const formattedDate = (date: string): string => {
  const myDate = new Date(date);
  const formated = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(myDate);

  return `${formated}`;
};


export const getDayLabel = (dayValue: number): string => {
  const day = weekDays.find((d) => d.value === dayValue);
  return day ? day.day : "";
};