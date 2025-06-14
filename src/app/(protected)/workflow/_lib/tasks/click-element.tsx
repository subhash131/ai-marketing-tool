import { TaskParamType, TaskType } from "@/types/flow-node";
import { WorkflowTask } from "@/types/workflow";
import { Edit, LucideProps, MousePointerClick } from "lucide-react";

export const ClickElementTask = {
  type: TaskType.CLICK_ELEMENT,
  label: "Click element",
  icon: (props: LucideProps) => <MousePointerClick {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
