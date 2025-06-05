"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FolderOpen, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SaveWorkflow from "./save-workflow";

const TopBar = ({
  title,
  subtitle,
  workflowId,
}: {
  title: string;
  workflowId: string;
  subtitle?: string;
}) => {
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="absolute w-full z-10 pt-2 h-16 top-0 flex items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center w-[30rem] h-full group pointer-events-auto">
        <div
          className={cn(
            "absolute p-2 bg-sidebar border rounded-sm min-w-60 transition-all duration-300 group-hover:top-0",
            `${show ? "top-0" : "-top-20"}`
          )}
        >
          <div className="flex items-center justify-between w-full ">
            <div>
              <p className="text-sm">{title}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              {/* TODO:: */}
              <SaveWorkflow workflowId={workflowId} />
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="cursor-pointer p-2 bg-muted rounded-md"
                    onClick={() => router.back()}
                  >
                    <X size={20} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exit</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
