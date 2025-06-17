import { TaskParamType, TaskType } from "@/types/flow-node";
import { WorkflowTask } from "@/types/workflow";
import { FileJson, LucideProps } from "lucide-react";

export const ReadPropertyFromJson = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read property from JSON",
  icon: (props: LucideProps) => <FileJson {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property path",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Property value",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
