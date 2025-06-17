import { TaskParamType, TaskType } from "@/types/flow-node";
import { WorkflowTask } from "@/types/workflow";
import { Database, FileJson, LucideProps } from "lucide-react";

export const AddPropertyToJson = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: (props: LucideProps) => <Database {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Updated JSON",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
