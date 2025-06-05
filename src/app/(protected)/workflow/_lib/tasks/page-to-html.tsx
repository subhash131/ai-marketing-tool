import { TaskParamType, TaskType } from "@/types/flow-node";
import { CodeIcon, Globe, LucideProps } from "lucide-react";

export const PageToHtml = {
  type: TaskType.PAGE_TO_HTML,
  label: "Page To Html",
  icon: (props: LucideProps) => <CodeIcon {...props} />,
  isEntryPoint: false,
  input: [
    {
      name: "web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  output: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
