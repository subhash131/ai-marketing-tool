import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "@/app/(protected)/workflow/_lib/tasks/page-to-html";

export const PageToHtmlExecutor = async (
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> => {
  try {
    const html = await environment.getPage()?.content();

    environment.setOutput("Html", html || "");

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
