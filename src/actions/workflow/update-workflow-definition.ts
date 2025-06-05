"use server";

export const updateWorkflowDefinition = async ({
  workflowId,
  newDefinition,
}: {
  workflowId: string;
  newDefinition: any;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/workflow/${workflowId}`, {
      body: JSON.stringify({
        definition: JSON.stringify(newDefinition),
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
      throw new Error("Failed to update definition");
    }
  } catch (e) {
    console.log("Failed to update definition", e);
    throw new Error("Failed to update definition");
  }
};
