import { bulkUpdatePhases } from "@/actions/workflow/bulk-update-phases";
import { getExecutionById } from "@/actions/workflow/get-execution-by-id";
import { updateExecutionById } from "@/actions/workflow/update-execution-by-id";
import { updateExecutionPhaseById } from "@/actions/workflow/update-execution-phase-by-id";
import { updateWorkflowById } from "@/actions/workflow/update-workflow-by-id";
import { TaskRegistry } from "@/app/(protected)/workflow/_lib/registry/task-registry";
import { FlowNode, TaskParamType } from "@/types/flow-node";
import {
  ExecutionPhaseStatus,
  ExecutionWithPhases,
  Phase,
  WorkflowExecutionStatus,
  WorkflowStatus,
} from "@/types/workflow";
import { revalidatePath } from "next/cache";
import "server-only";
import { executorRegistry } from "./executor/registry";
import {
  Environment,
  ExecutionEnvironment,
  LogCollector,
} from "@/types/executor";
import { Edge } from "@xyflow/react";
import { createLogCollector } from "./log";

export async function executeWorkflow(executionId: string) {
  const execution = await getExecutionById({ executionId });

  if (!execution) throw new Error("execution not found");

  const edges: Edge[] = JSON.parse(execution.definition).edges;

  //   Execution environment
  const environment: Environment = {
    phases: {},
  };

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatuses(execution);

  let executionFailed = false;
  let creditsConsumed = 0;
  for (const phase of execution.phases) {
    //Execute phase
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges
    );
  }

  await finalizeWorkflowExecution({
    executionId,
    workflowId: execution.workflowId,
    executionFailed,
    creditsConsumed,
  });

  await cleanUpEnvironment(environment);

  revalidatePath("/workflows/runs");
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string
) {
  try {
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
  } catch (e) {
    console.log(e);
  }
}

async function initializePhaseStatuses(execution: ExecutionWithPhases) {
  const phases = execution.phases.map((phase) => {
    return { _id: phase.id, status: ExecutionPhaseStatus.PENDING };
  });
  try {
    await bulkUpdatePhases({ body: phases });
  } catch (e) {
    console.log(e);
  }
}

async function finalizeWorkflowExecution({
  executionId,
  workflowId,
  executionFailed,
  creditsConsumed,
}: {
  executionId: string;
  workflowId: string;
  executionFailed: boolean;
  creditsConsumed: number;
}) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;
  try {
    await updateExecutionById({
      executionId,
      body: { status: finalStatus, completedAt: new Date(), creditsConsumed },
    });

    await updateWorkflowById({
      workflowId,
      body: {
        lastRunStatus: finalStatus,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

async function executeWorkflowPhase(
  phase: Phase,
  environment: Environment,
  edges: Edge[]
) {
  const startedAt = new Date();
  const node: FlowNode = JSON.parse(phase.node);
  const logCollector: LogCollector = createLogCollector();

  setupEnvironmentForPhase(node, environment, edges);

  await updateExecutionPhaseById({
    phaseId: phase.id,
    body: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
      // outputs: JSON.stringify(environment.phases[node.id].outputs),
    },
    logs: logCollector.getAll(),
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;
  console.log(`Executing phase ${phase.name} with ${creditsRequired} credits`);

  // TODO: decrement user credits (-creditsRequired)

  const success = await executePhase({
    node,
    phase,
    environment,
    logCollector,
  });
  const outputs = environment.phases[node.id].outputs;

  await finalizePhase(phase.id, success, outputs, logCollector);
  return { success };
}

async function finalizePhase(
  phaseId: string,
  success: boolean,
  outputs: any,
  logCollector: LogCollector
) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;
  const completedAt = new Date();
  await updateExecutionPhaseById({
    phaseId,
    body: {
      status: finalStatus,
      completedAt,
      outputs: JSON.stringify(outputs),
    },
    logs: logCollector.getAll(),
  });
}

export async function waitFor(ms: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

async function executePhase({
  phase,
  node,
  environment,
  logCollector,
}: {
  phase: Phase;
  node: FlowNode;
  environment: Environment;
  logCollector: LogCollector;
}): Promise<boolean> {
  const runFn = executorRegistry[node.data.type];
  if (!runFn) {
    return false;
  }
  const executionEnvironment: ExecutionEnvironment<any> =
    createExecutionEnvironment(node, environment, logCollector);
  return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(
  node: FlowNode,
  environment: Environment,
  edges: Edge[]
) {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue;
    }
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    //Get input value from outputs
    const connectedEdge = edges.find(
      (edge) => edge.targetHandle === input.name
    );

    if (!connectedEdge || !connectedEdge.sourceHandle) {
      console.error("Missing edge for input", input.name, "node id:", node.id);
      continue;
    }
    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle
      ];
    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

function createExecutionEnvironment(
  node: FlowNode,
  environment: Environment,
  logCollector: LogCollector
): ExecutionEnvironment<any> {
  return {
    getInput(name) {
      return environment.phases[node.id].inputs[name];
    },
    setOutput(name, value) {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser() {
      return environment.browser;
    },
    setBrowser(browser) {
      environment.browser = browser;
    },
    getPage() {
      return environment.page;
    },
    setPage(page) {
      environment.page = page;
    },
    log: logCollector,
  };
}

async function cleanUpEnvironment(environment: Environment) {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((e) => console.log("Failed to close browser", e));
  }
}
