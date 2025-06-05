"use server";

import { Workflow } from "@/types/workflow";

export const createWorkflow = async ({ workflow }: { workflow: Workflow }) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/workflow`, {
      body: JSON.stringify(workflow),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return { data, status: 200 };
    } else {
      throw new Error("Failed to create workflow");
    }
  } catch (e) {
    console.log("Failed to create workflow", e);
    throw new Error("Failed to create workflow");
  }
};
