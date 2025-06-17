import { FlowNode, TaskType } from "@/types/flow-node";
import React from "react";
import { TaskRegistry } from "../../_lib/registry/task-registry";
import { Trash, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { createFlowNode } from "../../_lib/create-workflow-node";

type props = {
  taskType: TaskType;
  nodeId: string;
};

const NodeHeader = ({ taskType, nodeId }: props) => {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="w-full flex flex-col border-b gap-2 cursor-grab active:cursor-grabbing drag-handle p-2">
      <div className=" flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <task.icon size={14} />
          <p className="text-sm">{task.label}</p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="relative text-red-500 overflow-hidden disabled:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              deleteElements({ nodes: [{ id: nodeId }] });
            }}
          >
            <span className="size-full absolute top-0 left-0 hover:bg-red-500 opacity-30" />
            <Trash size={14} />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const node = getNode(nodeId) as FlowNode;
              const nodeWidth = node.measured?.width!;
              const x = node.position.x + nodeWidth + 40;
              const y = node.position.y;
              const newNode = createFlowNode({
                nodeType: node.data.type,
                position: { x, y },
              });
              addNodes([newNode]);
            }}
          >
            <Copy size={14} />
          </Button>
        </div>
      </div>
      <div>
        <p className="text-[0.5rem]">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, sit? */}
        </p>
      </div>
    </div>
  );
};

export default NodeHeader;
