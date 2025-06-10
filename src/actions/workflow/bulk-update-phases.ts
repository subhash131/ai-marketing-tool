"use server";

export const bulkUpdatePhases = async ({ body }: { body: any }) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/bulk/execution/phases`, {
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
      throw new Error("Failed to update phases");
    }
  } catch (e) {
    console.log("Failed to update phases", e);
    throw new Error("Failed to update phases");
  }
};
