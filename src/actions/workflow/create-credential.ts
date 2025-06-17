"use server";
import { revalidatePath } from "next/cache";
import { symmetricEncrypt } from "../encrypt";

export type Credential = {
  name: string;
  value: string;
  userId: string;
  id?: string;
};

export const createCredential = async ({
  name,
  userId,
  value,
}: Credential): Promise<Credential> => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;

    if (!BACKEND_URL) throw new Error("BACKEND_URL is not defined");
    if (!userId) throw new Error("Unauthorized access");

    const encryptedValue = symmetricEncrypt(value);

    const res = await fetch(`${BACKEND_URL}/credential`, {
      body: JSON.stringify({ name, userId, value: encryptedValue }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to create credential");
    }
  } catch (e) {
    console.log("Failed to create credential", e);
    throw new Error("Failed to create credential");
  } finally {
    revalidatePath("/credentials");
  }
};
