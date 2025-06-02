import { TaskParamType, TaskType } from "@/types/flow-node";
import { Globe, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <Globe className="stroke-pink-500" {...props} />
  ),
  isEntryPoint: true,
  input: [
    {
      name: "website url",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
};
