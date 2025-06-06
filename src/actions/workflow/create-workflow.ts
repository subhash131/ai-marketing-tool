"use server";
import { Workflow, WorkflowStatus } from "@/types/workflow";

export const createWorkflow = async ({
  userId,
}: {
  userId: string;
}): Promise<Workflow> => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const initialWorkflow = {
      nodes: [],
      edges: [],
    };

    const workflow: Workflow = {
      definition: JSON.stringify(initialWorkflow),
      name: "demo",
      userId,
      status: WorkflowStatus.DRAFT,
      description: "demo",
      cron: "",
      executionPlan: "string",
      creditsCost: 0,
      lastRunAt: "2025-06-05T15:45:31.953Z",
      lastRunId: "string",
      lastRunStatus: "string",
      nextRunAt: "2025-06-05T15:45:31.953Z",

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("workflow", workflow);

    const res = await fetch(`${BACKEND_URL}/workflow`, {
      body: JSON.stringify(workflow),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to create Workflow");
    }
  } catch (e) {
    console.log("Failed to create workflow", e);
    throw new Error("Failed to create workflow");
  }
};
