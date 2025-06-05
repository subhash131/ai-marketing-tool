import React from "react";
import TaskComponentsBar from "./_components/components-bar";

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full">
      <TaskComponentsBar />
      {children}
    </div>
  );
};

export default WorkflowLayout;
