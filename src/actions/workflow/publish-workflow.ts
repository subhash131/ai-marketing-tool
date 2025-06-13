"use server";

import { WorkflowStatus } from "@/types/workflow";

export const publishWorkflow = async ({
  workflowId,
  flowDefinition,
}: {
  workflowId: string;
  flowDefinition: string;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/workflow/${workflowId}`, {
      body: JSON.stringify({
        definition: flowDefinition,
        status: WorkflowStatus.PUBLISHED,
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
      throw new Error("Failed to publish workflow");
    }
  } catch (e) {
    console.log("Failed to publish workflow", e);
    throw new Error("Failed to publish workflow");
  }
};
