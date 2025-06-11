"use server";

import { Phase } from "@/types/workflow";

export async function getWorkflowPhaseDetails(phaseId: string): Promise<Phase> {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/phase/${phaseId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to Phase Details");
    }
  } catch (e) {
    console.error("Failed to Phase Details", e);
    throw new Error("Failed to Phase Details");
  }
}
