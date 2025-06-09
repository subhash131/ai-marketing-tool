import React from "react";
import { FlowValidationContextProvider } from "@/context/flow-validation-context";

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlowValidationContextProvider>
      <div className="h-screen w-full">{children}</div>
    </FlowValidationContextProvider>
  );
};

export default WorkflowLayout;
