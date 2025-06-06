import { TaskType } from "@/types/flow-node";
import { ExtractTextFromElementTask } from "../tasks/extract-text-from-element-task";
import { LaunchBrowserTask } from "../tasks/launch-browser";
import { PageToHtml } from "../tasks/page-to-html";
import { WorkflowTask } from "@/types/workflow";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
