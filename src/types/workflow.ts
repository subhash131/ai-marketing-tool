export type Workflow = {
  userId: string;
  name: string;
  description?: string;
  definition?: string;
  executionPlan?: string;
  cron?: string;
  status?: string;
  creditsCost?: number;
  lastRunAt?: string;
  lastRunId?: string;
  lastRunStatus?: string;
  nextRunAt?: string;
  createdAt?: string;
  updatedAt?: string;
};
