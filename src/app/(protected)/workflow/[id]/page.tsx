import React from "react";

const WorkflowPage = ({ params }: { params: { id: string } }) => {
  return <div>WorkflowPage {params.id}</div>;
};

export default WorkflowPage;
