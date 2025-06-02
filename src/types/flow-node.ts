import { Node } from "@xyflow/react";

export enum TaskType {
  "LAUNCH_BROWSER" = "LAUNCH_BROWSER",
}

export interface FlowNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface FlowNode extends Node {
  data: FlowNodeData;
}
