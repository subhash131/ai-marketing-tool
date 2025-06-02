import { Node } from "@xyflow/react";

export enum TaskType {
  "LAUNCH_BROWSER" = "LAUNCH_BROWSER",
}

export enum TaskParamType {
  STRING = "STRING",
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

export interface FlowNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface FlowNode extends Node {
  data: FlowNodeData;
}
