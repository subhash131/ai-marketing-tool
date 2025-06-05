import React from "react";
import Header from "./header";
import WorkflowsGrid from "./workflows-grid";

const Workflows = () => {
  return (
    <div className="w-full h-screen pl-12">
      <Header />
      <WorkflowsGrid />
    </div>
  );
};

export default Workflows;
