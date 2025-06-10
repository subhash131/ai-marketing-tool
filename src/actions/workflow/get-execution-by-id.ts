"use server";

import { ExecutionWithPhases } from "@/types/workflow";

export const getExecutionById = async ({
  executionId,
}: {
  executionId: string;
}): Promise<ExecutionWithPhases> => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/execution/${executionId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to Fetch execution");
    }
  } catch (e) {
    console.error("Failed to Fetch execution", e);
    throw new Error("Failed to Fetch execution");
  }
};
