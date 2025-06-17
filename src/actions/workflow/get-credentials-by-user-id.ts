"use server";

import { Credential } from "./create-credential";

export async function getCredentialsByUserId(
  userId: string
): Promise<Credential[]> {
  try {
    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/credentials?userId=${userId}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to getCredentialsByUserId ::", e);
    throw new Error("Something went wrong, please check logs");
  }
}
