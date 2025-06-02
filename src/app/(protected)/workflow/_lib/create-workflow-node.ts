import { FlowNode, TaskType } from "@/types/flow-node";

export function createFlowNode({
  nodeType,
  position,
}: {
  nodeType: TaskType;
  position?: { x: number; y: number };
}): FlowNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position || { x: 60, y: 40 },
  };
}
