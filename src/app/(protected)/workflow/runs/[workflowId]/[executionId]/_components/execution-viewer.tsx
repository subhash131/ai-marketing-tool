"use client";
import { getWorkflowExecutionWithPhases } from "@/actions/workflow/get-workflow-execution-with-phases";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { parseTimestamp } from "@/lib/utils";
import { ExecutionWithPhases } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  CircleDashedIcon,
  ClockIcon,
  Coins,
  LucideIcon,
  Workflow,
} from "lucide-react";
import React, { ReactNode } from "react";

const ExecutionViewer = ({
  initialData,
}: {
  initialData: ExecutionWithPhases;
}) => {
  const query = useQuery({
    initialData,
    queryKey: ["execution", initialData?.id],
    queryFn: () => getWorkflowExecutionWithPhases(initialData?.id),
    refetchInterval: (q) => (q.state.data?.status === "RUNNING" ? 1000 : false),
  });
  return (
    <div className="size-full">
      <aside className="h-full w-80 max-w-80 border-r-2 border-separate flex flex-col overflow-hidden">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status}
          />
          <ExecutionLabel
            icon={Calendar}
            label="Started at"
            value={
              <span className="lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt))
                  : "--"}
              </span>
            }
          />
          <ExecutionLabel icon={ClockIcon} label="Duration" value={"TODO"} />
          <ExecutionLabel
            icon={Coins}
            label="Credits consumed"
            value={initialData.creditsConsumed}
          />
          <Separator />
          <div className="flex items-center justify-between pt-4 px-4 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <Workflow size={20} className="stroke-muted-foreground" />
              <span className="font-semibold">Phases</span>
            </div>
          </div>
          <div className="overflow-auto h-full px-2 py-4">
            {query.data.phases.map((phase, index) => {
              return (
                <Button
                  key={phase.id}
                  className="w-full justify-between cursor-pointer"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={"outline"}>{index + 1}</Badge>
                    <p className="font-semibold">{phase.name}</p>
                  </div>
                </Button>
              );
            })}
          </div>
          <Separator />
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;

function ExecutionLabel({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
}
