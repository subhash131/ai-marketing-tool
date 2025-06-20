import { createWorkflow } from "@/actions/workflow/create-workflow";
import { createFlowNode } from "@/app/(protected)/workflow/_lib/create-workflow-node";
import { TaskType } from "@/types/flow-node";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const CreateWorkflow = () => {
  const router = useRouter();
  const { mutate, data, isPending } = useMutation({
    mutationFn: createWorkflow,
    onError: (e) => {
      toast.error("Something went wrong" + JSON.stringify(e));
    },
    onSuccess: (data) => {
      toast.success("Launching the Editor");
      router.push(`/workflow/${data.id}`);
    },
  });

  useEffect(() => {
    if (isPending)
      toast.loading("Creating workflow..", { id: "create-workflow" });
    if (!isPending) toast.dismiss("create-workflow");
  }, [isPending]);
  return (
    <div
      className="rounded-md h-60 p-1 bg-sidebar-accent shadow active:scale-98 transition-transform cursor-pointer"
      onClick={() => {
        const node = createFlowNode({
          nodeType: TaskType.LAUNCH_BROWSER,
          position: { x: 300, y: 300 },
        });
        mutate({
          userId: "683c2c052507b4cdade10e0d",
          initialNodes: [node],
          initialEdges: [],
        });
      }}
    >
      <div className="bg-sidebar size-full rounded-sm border flex items-center justify-center flex-col gap-2">
        <Plus size={40} />
        <p className="text-xl">Create Workflow</p>
      </div>
    </div>
  );
};

export default CreateWorkflow;
