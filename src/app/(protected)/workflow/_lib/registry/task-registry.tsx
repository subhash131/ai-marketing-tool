import { TaskType } from "@/types/flow-node";
import { ExtractTextFromElementTask } from "../tasks/extract-text-from-element-task";
import { LaunchBrowserTask } from "../tasks/launch-browser";
import { PageToHtmlTask } from "../tasks/page-to-html";
import { WorkflowTask } from "@/types/workflow";
import { FillInputTask } from "../tasks/fill-input";
import { ClickElementTask } from "../tasks/click-element";
import { WaitForElementTask } from "../tasks/wait-for-element-task";
import { DeliverViaWebhook } from "../tasks/deliver-via-webhook";
import { ExtractDataWithAi } from "../tasks/extract-data-with-ai";
import { ReadPropertyFromJson } from "../tasks/read-property-from-json";
import { AddPropertyToJson } from "../tasks/add-property-to-json";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhook,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAi,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJson,
  ADD_PROPERTY_TO_JSON: AddPropertyToJson,
};
