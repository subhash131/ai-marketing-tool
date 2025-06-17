import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAi } from "@/app/(protected)/workflow/_lib/tasks/extract-data-with-ai";
import { getCredentialById } from "@/actions/workflow/get-cerdential-by-id";
import { symmetricDecrypt } from "@/actions/encrypt";
import { GoogleGenAI } from "@google/genai";

export const ExtractDataWithAiExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractDataWithAi>
): Promise<boolean> => {
  try {
    const credentialId = environment.getInput("Credential");
    if (!credentialId) {
      environment.log.error("input credentials is not defined");
      return false;
    }
    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("content is not defined");
      return false;
    }
    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("prompt is not defined");
      return false;
    }

    const credential = await getCredentialById({ credentialId });

    if (!credential) {
      environment.log.error("Credential not found");
      return false;
    }

    const decryptedCredential = symmetricDecrypt(credential.value);
    if (!decryptedCredential) {
      environment.log.error("failed to decrypt credentials");
      return false;
    }

    const ai = new GoogleGenAI({
      apiKey: decryptedCredential.toString(),
    });

    try {
      const response = await ai.models.generateContent({
        model: "models/gemini-2.5-flash-preview-05-20",
        contents: `${prompt} HTML:${content} `,
        config: {
          temperature: 0.2,
        },
      });
      const cleanJSON = response.text!.replace(/^```json|```$/g, "").trim();
      environment.log.info(
        "Tokens used ::" + response.usageMetadata?.totalTokenCount
      );
      environment.log.info("AI response ::" + cleanJSON);
      environment.setOutput("Results", cleanJSON);
    } catch (e) {
      environment.log.error(JSON.stringify(e));
      return false;
    }

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
