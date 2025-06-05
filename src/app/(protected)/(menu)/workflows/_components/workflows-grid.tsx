"use client";
import { getWorkflowsByUserId } from "@/actions/workflow/get-workflows-by-user-id";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import WorkflowCard from "./workflow-card";
import CreateWorkflow from "./create-workflow";
import { toast } from "sonner";
import { Workflow } from "@/types/workflow";

const WorkflowsGrid = () => {
  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["workflows"],
    queryFn: () => getWorkflowsByUserId("683c2c052507b4cdade10e0d"),
  });
  useEffect(() => {
    if (isError) toast.error("Failed to load workflow!");
    if (isLoading) toast.loading("loading...", { id: "workflows" });
    if (!isLoading) toast.dismiss("workflows");

    console.log(data);
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="px-10 size-full h-screen">
      <div className="grid w-full h-fit grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 justify-center pt-10">
        <CreateWorkflow />
        {isSuccess &&
          data?.length &&
          data.map((item: Workflow) => (
            <WorkflowCard {...item} key={item.createdAt} />
          ))}
      </div>
    </div>
  );
};

export default WorkflowsGrid;
