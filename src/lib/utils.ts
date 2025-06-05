import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTimestamp(timestamp: string): string {
  const trimmed = timestamp.slice(0, -3);

  const dateObj = new Date(trimmed);

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid timestamp format");
  }

  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();

  return `${time}, ${date}`;
}
