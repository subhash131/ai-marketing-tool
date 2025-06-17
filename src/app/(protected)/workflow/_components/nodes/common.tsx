import { TaskParamType } from "@/types/flow-node";

export const ColorForHandle: Record<TaskParamType, string> = {
  [TaskParamType.BROWSER_INSTANCE]: "!bg-sky-400",
  [TaskParamType.STRING]: "!bg-amber-400",
  [TaskParamType.SELECT]: "!hidden",
  [TaskParamType.CREDENTIAL]: "!bg-teal-400",
};
