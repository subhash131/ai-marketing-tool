import { LucideProps } from "lucide-react";
import { FlowNode, TaskParam, TaskType } from "./flow-node";
import { Log } from "./executor";

export type Workflow = {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  definition: string;
  executionPlan?: string;
  cron?: string;
  status?: WorkflowStatus;
  creditsCost?: number;
  lastRunAt?: string;
  lastRunId?: string;
  lastRunStatus?: string;
  nextRunAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits?: number;
};

export type WorkFlowExecutionPlan = WorkFlowExecutionPlanPhase[];

export type WorkFlowExecutionPlanPhase = {
  phase: number;
  nodes: FlowNode[];
};

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPILED = "COMPILED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PUBLISHED = "PUBLISHED",
}

export enum WorkflowExecutionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export enum ExecutionPhaseStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum WorkflowExecutionTrigger {
  MANUAL = "MANUAL",
  SCHEDULED = "SCHEDULED",
}

export type Phase = {
  id: string;
  userId: string;
  status: ExecutionPhaseStatus;
  number: number;
  node: string;
  name: string;
  startedAt: string | null;
  completedAt: string | null;
  inputs: string;
  outputs: string;
  creditsConsumed: number | null;
  workflowExecutionId: string;
  logs: Log[];
};

export type ExecutionWithPhases = {
  id: string;
  workflowId: string;
  userId: WorkflowExecutionTrigger;
  status: WorkflowStatus;
  createdAt: string;
  startedAt: string;
  trigger: string;
  completedAt: string;
  creditsConsumed: number | null;
  phases: Phase[];
  definition: string;
  logs: Log[];
};
