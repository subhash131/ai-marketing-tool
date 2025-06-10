"use server";

export const updateExecutionById = async ({
  executionId,
  body,
}: {
  executionId: string;
  body: any;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    console.log({ executionId, body });
    const res = await fetch(`${BACKEND_URL}/execution/${executionId}`, {
      body: JSON.stringify(body),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return { data, status: 200 };
    } else {
      throw new Error("Failed to update execution");
    }
  } catch (e) {
    console.log("Failed to update execution", e);
    throw new Error("Failed to update execution");
  }
};
