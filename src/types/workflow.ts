import { LucideProps } from "lucide-react";
import { FlowNode, TaskParam, TaskType } from "./flow-node";

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

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPILED = "COMPILED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PUBLISHED = "PUBLISHED",
}

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
