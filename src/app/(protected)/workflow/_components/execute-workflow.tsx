import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useExecutionPlan from "@/hooks/use-execution-plan";
import { Play } from "lucide-react";
import React from "react";

const ExecuteWorkflow = () => {
  const generate = useExecutionPlan();
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="cursor-pointer p-2 bg-muted rounded-md"
          onClick={() => {
            const plan = generate();
            console.log("----plan----");
            console.table(plan);
          }}
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
