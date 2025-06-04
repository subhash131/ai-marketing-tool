import React from "react";

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen w-full">{children}</div>;
};

export default WorkflowLayout;
