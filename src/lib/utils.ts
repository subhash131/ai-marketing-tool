import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, intervalToDuration } from "date-fns";
import { Phase } from "@/types/workflow";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTimestamp(dateString: string): string {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date(dateString);
  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: userTimeZone })
  );
  return formatDistanceToNow(localDate, { addSuffix: true });
}

export function getPhasesTotalCose(phases: Phase[]) {
  return phases.reduce(
    (acc, phase) => acc + Number(phase.creditsConsumed) || 0,
    0
  );
}

export function datesToDurationString(
  end: Date | null | undefined,
  start: Date | null | undefined
) {
  if (!start || !end) return;

  const timeElapsed = end.getTime() - start.getTime();

  if (timeElapsed < 1000) {
    return `${timeElapsed}ms`;
  }
  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });
  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
}

export function getUserLocalISOString() {
  const date = new Date();

  // Get user's timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert to local time in user's timezone
  const localeString = date.toLocaleString("en-US", { timeZone });

  // Create a Date object for local time string (in local TZ)
  const localDate = new Date(localeString);

  // Get offset in minutes relative to UTC for this local date
  const offsetMinutes = -localDate.getTimezoneOffset();

  const sign = offsetMinutes >= 0 ? "+" : "-";
  const pad = (num: number) =>
    String(Math.floor(Math.abs(num))).padStart(2, "0");

  const offsetHours = pad(offsetMinutes / 60);
  const offsetMins = pad(offsetMinutes % 60);

  // Format date part like YYYY-MM-DDTHH:mm:ss.sss
  const datePart = localDate.toISOString().substring(0, 23);

  return `${datePart}${sign}${offsetHours}:${offsetMins}`;
}
