"use client";
import { updateWorkflowDefinition } from "@/actions/workflow/update-workflow-definition";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReactFlow } from "@xyflow/react";
import { FolderOpen } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const SaveWorkflow = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: updateWorkflowDefinition,
    onSuccess: () => {
      toast.success("Workflow saved successfully");
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
              mutate({ newDefinition: toObject(), workflowId });
            }
          }}
        >
          <FolderOpen size={20} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Save</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SaveWorkflow;
