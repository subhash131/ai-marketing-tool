"use client";
import { FlowNode, TaskType } from "@/types/flow-node";
import { v4 as uuidv4 } from "uuid";

export function createFlowNode({
  nodeType,
  position,
}: {
  nodeType: TaskType;
  position?: { x: number; y: number };
}): FlowNode {
  const id = uuidv4();
  return {
    id,
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position || { x: 60, y: 40 },
  };
}
