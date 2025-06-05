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

export const WorkflowStatus = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  COMPILED: "COMPILED",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type WorkflowStatus = keyof typeof WorkflowStatus;
