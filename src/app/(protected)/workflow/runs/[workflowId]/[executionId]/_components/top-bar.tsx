"use client";
import { getWorkflowById } from "@/actions/workflow/get-workflow-by-id";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const TopBar = ({
  executionId,
  workflowId,
}: {
  executionId: string;
  workflowId: string;
}) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["workflow", workflowId],
    queryFn: () => getWorkflowById({ workflowId }),
  });
  return (
    <div className="h-14 py-4 sticky top-0 w-full bg-background border-b flex items-center px-4 gap-4">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeft size={20} />
      </Button>
      <div>
        <p>{data?.name}</p>
        <p className="text-xs text-muted-foreground">{`Run id: ${executionId}`}</p>
      </div>
    </div>
  );
};

export default TopBar;
