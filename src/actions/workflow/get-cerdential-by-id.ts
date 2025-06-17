"use server";

import { Credential } from "./create-credential";

export const getCredentialById = async ({
  credentialId,
}: {
  credentialId: string;
}): Promise<Credential> => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/credential/${credentialId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to Fetch credential");
    }
  } catch (e) {
    console.error("Failed to Fetch credential", e);
    throw new Error("Failed to Fetch credential");
  }
};
