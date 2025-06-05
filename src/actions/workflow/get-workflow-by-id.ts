"use server";

import { Workflow } from "@/types/workflow";

export const getWorkflowById = async ({
  workflowId,
}: {
  workflowId: string;
}): Promise<Workflow> => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/workflow/${workflowId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to Fetch Workflow");
    }
  } catch (e) {
    console.error("Failed to Fetch Workflow", e);
    throw new Error("Failed to Fetch Workflow");
  }
};
