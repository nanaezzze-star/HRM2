import { Timestamp } from "firebase/firestore";

export const formatDate = (
  date: Date | string | Timestamp | null | undefined,
): string => {
  if (!date) return ""; //passed null|undefibed return ""

  let parsedDate: Date;

  if (
    date instanceof Timestamp ||
    (typeof date === "object" && "toDate" in date) // typeof date === "object" case "in" can return typeError
  ) {
    parsedDate = (date as Timestamp).toDate();
  } else if (date instanceof Date) {
    parsedDate = date;
  } else {
    parsedDate = new Date(date); // transform to Data obj
  }

  if (isNaN(parsedDate.getTime())) {
    return "";
  }
  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (seconds?: number) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return { mins, secs };
};
