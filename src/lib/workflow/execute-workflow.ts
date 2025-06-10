import { bulkUpdatePhases } from "@/actions/workflow/bulk-update-phases";
import { getExecutionById } from "@/actions/workflow/get-execution-by-id";
import { updateExecutionById } from "@/actions/workflow/update-execution-by-id";
import { updateWorkflowById } from "@/actions/workflow/update-workflow-by-id";
import {
  ExecutionPhaseStatus,
  ExecutionWithPhases,
  WorkflowExecutionStatus,
  WorkflowStatus,
} from "@/types/workflow";
import { revalidatePath } from "next/cache";
import "server-only";

export async function executeWorkflow(executionId: string) {
  const execution = await getExecutionById({ executionId });

  if (!execution) throw new Error("execution not found");

  //   Execution environment
  const environment = {
    phases: {},
  };

  await initializeWorkflowExecution(executionId, execution.workflowId);

  //Initialize workflow execution
  await initializePhaseStatuses(execution);
  //Initialize phases status

  let executionFailed = false;
  for (const phase of execution.phases) {
    //Execute phase
  }

  //   Finalize execution
  //   clean up env

  revalidatePath("/workflows/runs");
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string
) {
  console.log({ executionId, workflowId });
  await updateWorkflowById({
    workflowId,
    body: {
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: WorkflowStatus.RUNNING,
    },
  });
  await updateExecutionById({
    executionId,
    body: { startedAt: new Date(), status: WorkflowExecutionStatus.RUNNING },
  });
}

async function initializePhaseStatuses(execution: ExecutionWithPhases) {
  const phases = execution.phases.map((phase) => {
    return { _id: phase.id, status: ExecutionPhaseStatus.PENDING };
  });
  await bulkUpdatePhases({ body: phases });
}
