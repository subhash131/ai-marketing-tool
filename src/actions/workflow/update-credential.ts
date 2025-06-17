"use server";

import { Credential } from "./create-credential";

export const updateCredential = async ({
  name,
  value,
  id,
}: Credential): Promise<Credential> => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}/credential/${id}`, {
      body: JSON.stringify({ name, value }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to update credential");
    }
  } catch (e) {
    console.log("Failed to update credential", e);
    throw new Error("Failed to create credential");
  }
};
