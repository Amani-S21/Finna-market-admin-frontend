export const formattedDate = (date: string): string => {
  let myDate = new Date(date);
  let formated = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(myDate);

  return `${formated}`;
};
