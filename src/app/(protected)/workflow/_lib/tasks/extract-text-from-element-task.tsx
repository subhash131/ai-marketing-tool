import { TaskParamType, TaskType } from "@/types/flow-node";
import { LucideProps, Text } from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => <Text {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
  ],
};
