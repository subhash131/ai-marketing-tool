"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import SaveWorkflow from "./save-workflow";
import ExecuteWorkflow from "./execute-workflow";
import ExitEditor from "./exit-editor";

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

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="absolute w-full z-10 pt-2 h-16 top-0 flex items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center w-96 h-full group pointer-events-auto">
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
              <ExecuteWorkflow workflowId={workflowId} />

              <SaveWorkflow workflowId={workflowId} />
              <ExitEditor />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
