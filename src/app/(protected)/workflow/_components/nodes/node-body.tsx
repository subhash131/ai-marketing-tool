import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/flow-node";
import { Handle, Position } from "@xyflow/react";
import React from "react";

const NodeBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b flex flex-col gap-1">{children}</div>;
};
export default NodeBody;

export const NodeInput = ({
  input: { name, type, helperText, required, hideHandle, value },
}: {
  input: TaskParam;
}) => {
  return (
    <div className="p-2 relative">
      <pre className="text-xs">
        {JSON.stringify(
          { name, type, helperText, required, hideHandle, value },
          null,
          2
        )}
      </pre>
      <Handle
        id={"ssubas"}
        type="source"
        position={Position.Left}
        className={cn("!size-3 active:!bg-blue-500")}
      />
    </div>
  );
};
