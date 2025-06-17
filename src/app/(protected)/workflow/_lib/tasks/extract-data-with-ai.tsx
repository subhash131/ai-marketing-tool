import { TaskParamType, TaskType } from "@/types/flow-node";
import { WorkflowTask } from "@/types/workflow";
import { Brain, LucideProps, Send } from "lucide-react";

export const ExtractDataWithAi = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "AI Prompt",
  icon: (props: LucideProps) => <Brain {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credential",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Results",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
} satisfies WorkflowTask;
