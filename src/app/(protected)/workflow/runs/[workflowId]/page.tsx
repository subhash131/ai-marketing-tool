"use client";
import { getWorkflowExecutionsById } from "@/actions/workflow/get-workflow-executions-by-id";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import ExecutionTable from "./_components/execution-table";

const WorkflowRunsPage = ({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) => {
  const { workflowId } = use(params);
  const router = useRouter();
  return (
    <div className="w-screen h-full flex flex-col overflow-x-hidden">
      <div className="h-14 py-4 sticky top-0 w-full bg-background border-b flex items-center px-4 gap-4">
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
        </Button>
        <div>
          <p>Execution history</p>
          <p className="text-xs text-muted-foreground">
            List of all workflow executions
          </p>
        </div>
      </div>
      <ExecutionTableWrapper workflowId={workflowId} />
    </div>
  );
};

export default WorkflowRunsPage;

function ExecutionTableWrapper({ workflowId }: { workflowId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["workflow-executions", workflowId],
    queryFn: async () => {
      const res = await getWorkflowExecutionsById(workflowId);
      return res;
    },
    enabled: !!workflowId,
  });

  if (isLoading)
    return (
      <div className="size-full flex items-center justify-center">
        <Loader2 className="animate-spin" size={38} />
      </div>
    );
  if (!data || data?.length === 0)
    return (
      <div className="size-full flex flex-col items-center justify-center gap-2 ">
        <div className="size-12 flex items-center justify-center bg-accent rounded-full">
          <Inbox size={26} />
        </div>
        <div className="flex items-center justify-center flex-col">
          <p>No executions found</p>
          <p className="text-muted-foreground text-xs">
            You can trigger the workflow in the editor page
          </p>
        </div>
      </div>
    );
  return <ExecutionTable workflowId={workflowId} initialData={data} />;
}
