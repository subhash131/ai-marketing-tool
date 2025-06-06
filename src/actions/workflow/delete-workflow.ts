"use server";
export const deleteWorkflow = async ({
  workflowId,
}: {
  workflowId: string;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/workflow/${workflowId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      return { data, status: 200 };
    } else {
      throw new Error("Failed to delete workflow");
    }
  } catch (e) {
    console.log("Failed to delete workflow", e);
    throw new Error("Failed to delete workflow");
  }
};
