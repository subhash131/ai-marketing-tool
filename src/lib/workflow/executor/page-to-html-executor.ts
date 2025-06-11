import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtml } from "@/app/(protected)/workflow/_lib/tasks/page-to-html";

export const PageToHtmlExecutor = async (
  environment: ExecutionEnvironment<typeof PageToHtml>
): Promise<boolean> => {
  try {
    const html = await environment.getPage()?.content();

    environment.setOutput("Html", html || "");

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
