export const formatDate = (dateInput?: Date | string): string => {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  return `${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const formatTime = (seconds?: number) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return { mins, secs };
};
