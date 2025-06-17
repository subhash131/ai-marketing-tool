"use server";

import { revalidatePath } from "next/cache";

export const deleteCredentialById = async ({
  credentialId,
}: {
  credentialId: string;
}) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/credential/${credentialId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      return { data, status: 200 };
    } else {
      throw new Error("Failed to delete Credential");
    }
  } catch (e) {
    console.log("Failed to delete Credential", e);
    throw new Error("Failed to delete Credential");
  } finally {
    revalidatePath("/credentials");
  }
};
