import crypto from "crypto";
import "server-only";

const ALG = "aes-256-cbc";

export function symmetricEncrypt(value: string) {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("ENCRYPTION_KEY is not defined");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);

  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function symmetricDecrypt(encrypted: string) {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("ENCRYPTION_KEY is not defined");
  const cipher = encrypted.split(":");
  const iv = Buffer.from(cipher.shift() as string, "hex");
  const encryptedText = Buffer.from(cipher.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALG, Buffer.from(key, "hex"), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted;
}
