import { WaitForElementTask } from "@/app/(protected)/workflow/_lib/tasks/wait-for-element-task";
import { ExecutionEnvironment } from "@/types/executor";

export const WaitForElementExecutor = async (
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input selector is not defined");
      return false;
    }
    const visibility = environment.getInput("Visibility");
    if (!selector) {
      environment.log.error("input selector is not defined");
      return false;
    }
    await environment.getPage()?.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.info(`element ${selector} is ${visibility}`);

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
