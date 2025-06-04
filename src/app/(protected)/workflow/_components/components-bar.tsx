import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";
import React from "react";

const ComponentsBar = () => {
  return (
    <header className="absolute p-2 top-2 bg-[#FAFAFA] dark:bg-[#171717] flex items-center gap-4   right-2 border rounded-md z-10 w-60">
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="text-sm">Title</p>
          <p className="text-xs text-muted-foreground">Subtitle</p>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <div className="cursor-pointer p-1 bg-transparent">
              <X />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Exit</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default ComponentsBar;
