import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Play } from "lucide-react";
import React from "react";

const ExecuteWorkflow = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="cursor-pointer p-2 bg-muted rounded-md"
          onClick={() => {}}
        >
          <Play size={20} className="stroke-orange-500" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Execute</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ExecuteWorkflow;
