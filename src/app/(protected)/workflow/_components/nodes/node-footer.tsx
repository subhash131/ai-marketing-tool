import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React from "react";

const NodeFooter = () => {
  return (
    <div className="w-full h-fit relative p-2">
      <label className="text-xs">Result</label>
      <pre className="text-xs">
        {JSON.stringify({ name: "subhash" }, null, 2)}
      </pre>
      <Handle
        id={"sb"}
        type="target"
        position={Position.Right}
        className={cn("!size-3 active:!bg-blue-500")}
      />
    </div>
  );
};

export default NodeFooter;
