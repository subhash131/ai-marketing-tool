import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/flow-node";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";
import { v4 as uuidv4 } from "uuid";

const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b flex flex-col gap-1">{children}</div>;
};
export default NodeInputs;

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  return (
    <div className="p-2 relative">
      <NodeParamField param={input} nodeId={nodeId} />
      <Handle
        id={input.name}
        type="target"
        position={Position.Left}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !size-4",
          ColorForHandle[input.type]
        )}
      />
    </div>
  );
};
