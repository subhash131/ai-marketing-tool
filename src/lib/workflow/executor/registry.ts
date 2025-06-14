import { TaskType } from "@/types/flow-node";
import { LaunchBrowserExecutor } from "./launche-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElement } from "./extract-text-from-element-executor";
import { FillInputExecutor } from "./fill-input-executor";
import { ClickElementExecutor } from "./click-element-executor";
import { WaitForElementExecutor } from "./wait-for-element-executor";
import { DeliverViaWebhookExecutor } from "./deliver-via-webhook-executor";

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const executorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
};
