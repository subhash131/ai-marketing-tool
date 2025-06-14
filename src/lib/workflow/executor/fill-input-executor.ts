import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "@/app/(protected)/workflow/_lib/tasks/page-to-html";
import { FillInputTask } from "@/app/(protected)/workflow/_lib/tasks/fill-input";

export const FillInputExecutor = async (
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector is not defined");
      return false;
    }
    environment.setOutput("Web page", selector);

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("value is not defined");
      return false;
    }
    await environment.getPage()?.type(selector, value);

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
