"use server";
import { ExecutionWithPhases } from "@/types/workflow";

export async function getWorkflowExecutionWithPhases(
  executionId: string
): Promise<ExecutionWithPhases> {
  try {
    console.log("Running getWorkflowExecutionWithPhases");
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/execution/${executionId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to Fetch Execution");
    }
  } catch (e) {
    console.error("Failed to Fetch Execution", e);
    throw new Error("Failed to Fetch Execution");
  }
}
