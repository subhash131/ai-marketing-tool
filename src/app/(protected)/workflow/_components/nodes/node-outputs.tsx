import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/flow-node";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./common";

const NodeOutputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b flex flex-col gap-1">{children}</div>;
};
export default NodeOutputs;

const NodeOutput = ({ output }: { output: TaskParam }) => {
  return (
    <div className="w-full h-fit relative p-2">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={"sb"}
        type="target"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !size-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};

export { NodeOutput };
