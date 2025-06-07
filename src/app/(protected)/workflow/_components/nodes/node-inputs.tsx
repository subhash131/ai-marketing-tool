import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/flow-node";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/hooks/use-flow-validation";

const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b flex flex-col gap-1">{children}</div>;
};
export default NodeInputs;

export const NodeInput = ({
  input,
  nodeId,
  isEntryPoint,
}: {
  input: TaskParam;
  nodeId: string;
  isEntryPoint: boolean;
}) => {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some((edge) => {
    return edge.target === nodeId && edge.targetHandle === input.name;
  });

  const hasErrors = invalidInputs
    ?.find((input) => input.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div className={cn(hasErrors && "bg-destructive", "p-2 relative")}>
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />

      {!isEntryPoint && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !size-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};
