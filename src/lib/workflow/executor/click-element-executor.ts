import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "@/app/(protected)/workflow/_lib/tasks/click-element";

export const ClickElementExecutor = async (
  environment: ExecutionEnvironment<typeof ClickElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input selector is not defined");
      return false;
    }
    await environment.getPage()?.click(selector);

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
