"use client";
import { getWorkflowExecutionsById } from "@/actions/workflow/get-workflow-executions-by-id";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { datesToDurationString } from "@/lib/utils";
import { ExecutionWithPhases } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const ExecutionTable = ({
  workflowId,
  initialData,
}: {
  workflowId: string;
  initialData: ExecutionWithPhases[];
}) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["workflow-executions", workflowId],
    initialData,
    queryFn: async () => {
      const res = await getWorkflowExecutionsById(workflowId);
      return res;
    },
    enabled: !!workflowId,
    refetchInterval: 5000,
  });
  return (
    <div className="shadow-md overflow-auto hide-scrollbar px-40 py-4">
      <Table className="h-full border">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-xs text-muted-foreground">
              Stated at (desc)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {data.map((execution) => {
            const duration = datesToDurationString(
              new Date(execution.completedAt),
              new Date(execution.startedAt)
            );
            return (
              <TableRow
                key={execution.id}
                onClick={() => {
                  router.push(`/workflow/runs/${workflowId}/${execution.id}`);
                }}
              >
                <TableCell>
                  <div>
                    <p>{execution.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {`Trigger: ${execution.trigger}`}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{execution.status}</p>
                    <p className="text-xs text-muted-foreground">{duration}</p>
                  </div>
                </TableCell>
                <TableCell>{execution.creditsConsumed}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {new Date(execution.startedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExecutionTable;
