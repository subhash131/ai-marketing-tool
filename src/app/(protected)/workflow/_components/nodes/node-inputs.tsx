import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/flow-node";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";

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
  const edges = useEdges();
  const isConnected = edges.some((edge) => {
    return edge.target === nodeId && edge.targetHandle === input.name;
  });

  return (
    <div className="p-2 relative">
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
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
