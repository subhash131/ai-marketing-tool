"use client";
import { publishWorkflow } from "@/actions/workflow/publish-workflow";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Upload } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const PublishWorkflow = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published successfully");
    },
    onError: (e) => {
      toast.error("Something went wrong" + JSON.stringify(e));
    },
    onSettled: () => {
      toast.dismiss("save-workflow");
    },
  });
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="cursor-pointer p-2 bg-muted rounded-md"
          onClick={() => {
            if (!isPending) {
              toast.loading("Saving workflow...", {
                id: "save-workflow",
              });
              mutate({
                workflowId,
                flowDefinition: JSON.stringify(toObject()),
              });
            }
          }}
        >
          <Upload size={20} className="stroke-green-500" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Publish</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PublishWorkflow;
