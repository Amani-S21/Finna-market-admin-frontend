export const formatTime = (dateString: string, locale = "fr-FR"): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
