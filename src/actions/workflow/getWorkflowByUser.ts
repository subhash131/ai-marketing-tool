"use server";

export async function getWorkflowByUser(userId: string) {
  try {
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/workflow?userId=${userId}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to getWorkflowByUser ::", e);
    throw new Error("Something went wrong, please check logs");
  }
}
