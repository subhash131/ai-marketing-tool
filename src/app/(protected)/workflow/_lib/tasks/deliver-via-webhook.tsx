import { TaskParamType, TaskType } from "@/types/flow-node";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, Send } from "lucide-react";

export const DeliverViaWebhook = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via webhook",
  icon: (props: LucideProps) => <Send {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [] as const,
} satisfies WorkflowTask;
