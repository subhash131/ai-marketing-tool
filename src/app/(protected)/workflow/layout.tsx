import React from "react";
import ComponentsBar from "./_components/components-bar";

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full">
      <ComponentsBar />
      {children}
    </div>
  );
};

export default WorkflowLayout;
