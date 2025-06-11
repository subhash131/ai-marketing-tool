"use server";
import { LogLevel } from "@/types/executor";

export const createLogs = async ({
  executionPhaseId,
  logLevel,
  message,
}: {
  executionPhaseId: string;
  logLevel: LogLevel;
  message: string;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}/workflow`, {
      body: JSON.stringify({
        executionPhaseId,
        logLevel,
        message,
        timestamp: new Date(),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to create log");
    }
  } catch (e) {
    console.log("Failed to  create log", e);
    throw new Error("Failed to create log");
  }
};
