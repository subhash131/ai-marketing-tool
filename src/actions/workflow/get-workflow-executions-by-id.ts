"use server";
import { ExecutionWithPhases } from "@/types/workflow";

export async function getWorkflowExecutionsById(
  workflowId: string
): Promise<ExecutionWithPhases[]> {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    console.log(BACKEND_URL);
    const res = await fetch(
      `${BACKEND_URL}/executions?workflowId=${workflowId}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to Fetch Workflow Execution");
    }
  } catch (e) {
    console.error("Failed to Fetch Workflow Execution", e);
    throw new Error("Failed to Fetch Workflow Execution");
  }
}
