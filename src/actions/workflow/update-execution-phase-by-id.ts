"use server";

import { Log } from "@/types/executor";

export const updateExecutionPhaseById = async ({
  phaseId,
  body,
  logs,
}: {
  phaseId: string;
  body: any;
  logs: Log[];
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/execution/phase/${phaseId}`, {
      body: JSON.stringify({
        phase: body,
        logs: logs.map(({ logLevel, message, timestamp }) => ({
          message: message,
          executionPhaseId: phaseId,
          logLevel: logLevel,
          timestamp: timestamp,
        })),
      }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return { data, status: 200 };
    } else {
      throw new Error("Failed to update workflow");
    }
  } catch (e) {
    console.log("Failed to update workflow", e);
    throw new Error("Failed to update workflow");
  }
};
