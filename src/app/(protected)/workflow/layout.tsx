import React from "react";
import TaskComponentsBar from "./_components/components-bar";
import { FlowValidationContextProvider } from "@/context/flow-validation-context";

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlowValidationContextProvider>
      <div className="h-screen w-full">
        <TaskComponentsBar />
        {children}
      </div>
    </FlowValidationContextProvider>
  );
};

export default WorkflowLayout;
