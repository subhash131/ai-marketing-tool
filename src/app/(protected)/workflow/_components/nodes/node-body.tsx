import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/flow-node";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";

const NodeBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b flex flex-col gap-1">{children}</div>;
};
export default NodeBody;

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
        id={"ssubas"}
        type="source"
        position={Position.Left}
        className={cn("!size-3 active:!bg-blue-500")}
      />
    </div>
  );
};
