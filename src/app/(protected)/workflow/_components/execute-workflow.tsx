"use client";
import { runWorkflow } from "@/actions/workflow/run-workflow";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useExecutionPlan from "@/hooks/use-execution-plan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { LoaderCircle, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ExecuteWorkflow = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: runWorkflow,
    onSuccess: (redirectUrl: string) => {
      router.push(redirectUrl);
    },
    onError: (e) => {
      toast.error("Something went wrong" + JSON.stringify(e));
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.loading("Executing workflow...", {
        id: "execute-workflow",
      });
    } else {
      toast.dismiss("execute-workflow");
    }
  }, [isPending]);

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="cursor-pointer p-2 bg-muted rounded-md"
          onClick={() => {
            const plan = generate();
            if (!plan || isPending) return;
            mutate({
              workflowId,
              flowDefinition: JSON.stringify(toObject()),
            });
          }}
        >
          {!isPending && <Play size={20} className="stroke-orange-500" />}
          {isPending && (
            <LoaderCircle size={20} className="stroke-green-500 animate-spin" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Execute</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ExecuteWorkflow;
