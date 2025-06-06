import { deleteWorkflow } from "@/actions/workflow/delete-workflow";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { parseTimestamp } from "@/lib/utils";
import { Workflow } from "@/types/workflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logs, Menu, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

const WorkflowCard = ({
  description,
  name,
  status,
  userId,
  lastRunAt,
  lastRunStatus,
  id,
}: Workflow) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkflow,
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (e) => {
      toast.success(e.data.message);
      queryClient.invalidateQueries({
        queryKey: ["workflows"],
      });
    },
    onSettled: () => {
      toast.dismiss(`delete-${id}`);
    },
  });

  useEffect(() => {
    if (isPending) toast.loading(`Deleting ${name}`, { id: `delete-${id}` });
  }, [isPending]);

  return (
    <div className="rounded-md h-60 p-1 bg-sidebar-accent shadow hover:rotate-1 transition-transform">
      <div className="bg-sidebar size-full rounded-sm border p-2 flex flex-col justify-between">
        <div className="w-full ">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">{name}</p>
            <div className="text-xs px-4 py-1 rounded-full bg-accent">
              {status as any}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>Last run: {lastRunAt && parseTimestamp(lastRunAt)}</p>
            <div className="flex items-center justify-center gap-1">
              <div className="p-1 rounded-full bg-green-500" />
              <p className="text-foreground rounded-full">{lastRunStatus}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button asChild>
              <Link href={`/workflow/${id}`} className="cursor-pointer">
                Edit <Pencil />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  Execution logs
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    mutate({ workflowId: id! });
                  }}
                  className="text-red-500 hover:!text-red-500 cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
