"use server";

export const updateExecutionPhaseById = async ({
  phaseId,
  body,
}: {
  phaseId: string;
  body: any;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/execution/phase/${phaseId}`, {
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
      throw new Error("Failed to update workflow");
    }
  } catch (e) {
    console.log("Failed to update workflow", e);
    throw new Error("Failed to update workflow");
  }
};
