"use server";

export const updateWorkflowDefinition = async ({
  workflowId,
}: {
  workflowId: string;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/workflow/${workflowId}`);
    if (res.ok) {
      const data = await res.json();
      return { data, status: 200 };
    } else {
      throw new Error("Failed to Fetch Workflow");
    }
  } catch (e) {
    console.error("Failed to Fetch Workflow", e);
    throw new Error("Failed to Fetch Workflow");
  }
};
