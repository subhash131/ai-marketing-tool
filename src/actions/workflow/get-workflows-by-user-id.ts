"use server";

export async function getWorkflowsByUserId(userId: string) {
  try {
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/workflows?userId=${userId}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to getWorkflowByUser ::", e);
    throw new Error("Something went wrong, please check logs");
  }
}
