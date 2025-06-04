import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const TopBar = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="absolute w-full z-10 pt-2 h-16 top-0 flex items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center w-[30rem] h-full group pointer-events-auto">
        <div
          className={cn(
            "absolute p-2 dark:bg-[#171717] bg-[#FAFAFA] border rounded-sm min-w-60 transition-all duration-300 group-hover:top-0",
            `${show ? "top-0" : "-top-20"}`
          )}
        >
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
        </div>
      </div>
    </header>
  );
};

export default TopBar;
