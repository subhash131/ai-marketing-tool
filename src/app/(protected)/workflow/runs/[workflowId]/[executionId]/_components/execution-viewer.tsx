"use client";
import { getWorkflowExecutionWithPhases } from "@/actions/workflow/get-workflow-execution-with-phases";
import { getWorkflowPhaseDetails } from "@/actions/workflow/get-workflow-phase-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, datesToDurationString, getPhasesTotalCose } from "@/lib/utils";
import { Log, LogLevel } from "@/types/executor";
import { WorkflowStatus } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  CircleDashedIcon,
  ClockIcon,
  Coins,
  Loader2Icon,
  LucideIcon,
  Workflow,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import PhaseStatusBadge from "./phase-status-badge";

const ExecutionViewer = ({ executionId }: { executionId: string }) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const query = useQuery({
    queryKey: ["execution", executionId],
    queryFn: async () => {
      const res = await getWorkflowExecutionWithPhases(executionId);
      console.log({ res });
      return res;
    },
    refetchInterval: (q) => (q.state.data?.status === "RUNNING" ? 1000 : false),
  });

  console.log({ query });

  const { data: phaseDetails } = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    queryFn: async () => {
      if (selectedPhase) {
        return await getWorkflowPhaseDetails(selectedPhase);
      }
    },
    enabled: !!selectedPhase,
  });

  const isRunning = query.data?.status === WorkflowStatus.RUNNING;

  useEffect(() => {
    if (!query.data || query.data?.phases?.length === 0) return;
    const phases = query.data?.phases || [];
    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];
      setSelectedPhase(phaseToSelect?.id);
      return;
    }
    const phaseToSelect = phases.toSorted((a, b) =>
      a.startedAt! > b.startedAt! ? -1 : 1
    )[0];
    setSelectedPhase(phaseToSelect?.id);
  }, [query.data?.phases, query.data?.status, setSelectedPhase]);

  const creditsConsumed = getPhasesTotalCose(query.data?.phases || []);

  if (query.isLoading) return <div>Loading...</div>;

  if (!query.data) return <div>404 Not found</div>;
  const duration = datesToDurationString(
    new Date(query.data?.completedAt),
    new Date(query.data?.startedAt)
  );
  return (
    <div className="w-full h-full flex">
      <div className="h-full min-w-[28rem] max-w-[28rem] border-r-2 border-separate flex flex-col overflow-hidden">
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
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={Coins}
            label="Credits consumed"
            value={creditsConsumed}
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
                  variant={selectedPhase === phase.id ? "secondary" : "ghost"}
                  onClick={() => {
                    if (isRunning) return;
                    setSelectedPhase(phase.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={"outline"}>{index + 1}</Badge>
                    <p className="font-semibold">{phase.name}</p>
                  </div>
                  <PhaseStatusBadge status={phase.status} />
                </Button>
              );
            })}
          </div>
          <Separator />
        </div>
      </div>
      <div className="flex w-full h-full justify-center overflow-hidden p-2">
        {!selectedPhase && (
          <div className="text-sm text-muted-foreground size-full flex items-center justify-center">
            Select a phase to view.
          </div>
        )}
        {selectedPhase && phaseDetails?.id && (
          <div className="flex flex-col py-4 container gap-4 overflow-y-scroll hide-scrollbar pb-60">
            <div className="flex gap-2 ">
              <Badge variant={"outline"} className="space-x-1">
                <Coins size={24} className="stroke-muted-foreground" />
                <span>Credits</span>
                <span>{phaseDetails.creditsConsumed || 0}</span>
              </Badge>
              <Badge variant={"outline"} className="space-x-1">
                <ClockIcon size={24} className="stroke-muted-foreground" />
                <span>Duration</span>
                <span>
                  {phaseDetails.startedAt && phaseDetails.completedAt
                    ? datesToDurationString(
                        new Date(phaseDetails.completedAt),
                        new Date(phaseDetails.startedAt)
                      ) || "-"
                    : "-"}
                </span>
              </Badge>
            </div>
            <div className="flex flex-col gap-4">
              <ParameterViewer
                title="Inputs"
                subtitle="Inputs used for this phase"
                paramJson={phaseDetails.inputs}
              />
              <ParameterViewer
                title="Outputs"
                subtitle="Outputs generated for this phase"
                paramJson={phaseDetails.outputs}
              />

              {phaseDetails.logs.length > 0 && (
                <LogViewer logs={phaseDetails.logs} />
              )}
            </div>
          </div>
        )}
      </div>
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

function ParameterViewer({
  paramJson,
  subtitle,
  title,
}: {
  title: string;
  subtitle: string;
  paramJson: any;
}) {
  const params = paramJson ? JSON.parse(paramJson) : undefined;

  return (
    <Card className="py-0 overflow-hidden">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p>No input parameters in this phase</p>
          )}
          {params &&
            Object.entries(params).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center space-y-1"
              >
                <p className="text-sm text-muted-foreground flex-1 basis-1/3">
                  {key}
                </p>
                <Input
                  readOnly
                  value={value as string}
                  className="flex-1 basis-2/3"
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LogViewer({ logs }: { logs: Log[] | undefined }) {
  if (!logs) return null;
  return (
    <Card className="py-0 overflow-hidden">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Logs generated by this phase
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="text-muted-foreground">
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-xs font-bold p-0.5 pl-4",
                    (log.logLevel as LogLevel) === "error" &&
                      "text-destructive",
                    (log.logLevel as LogLevel) === "info" && "text-primary"
                  )}
                >
                  {log.logLevel}
                </TableCell>
                <TableCell className="text-sm flex-1 p-0.5 pl-4">
                  {log.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
