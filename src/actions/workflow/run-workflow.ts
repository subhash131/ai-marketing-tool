"use server";

import { FlowToExecutionPlan } from "@/app/(protected)/workflow/_lib/execution-plan";
import { TaskRegistry } from "@/app/(protected)/workflow/_lib/registry/task-registry";
import { executeWorkflow } from "@/lib/workflow/execute-workflow";
import {
  ExecutionPhaseStatus,
  WorkFlowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow";

export async function runWorkflow({
  workflowId,
  flowDefinition,
}: {
  workflowId: string;
  flowDefinition?: string;
}) {
  if (!workflowId) {
    throw new Error("workflowId is required");
  }
  const BACKEND_URL = process.env.BACKEND_URL;
  const date = new Date();

  let workflow;
  const res = await fetch(`${BACKEND_URL}/workflow/${workflowId}`);
  if (res.ok) {
    workflow = await res.json();
  } else {
    throw new Error("Failed to Fetch Workflow");
  }
  if (!workflow) throw new Error("workflow not found");
  let executionPlan: WorkFlowExecutionPlan;
  if (!flowDefinition) throw new Error("flow definition in not defined");
  const flow = JSON.parse(flowDefinition);

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (!result.executionPlan)
    throw new Error("Failed to generate execution plan");

  executionPlan = result.executionPlan;

  const phases = executionPlan.flatMap((p) => {
    return p.nodes.map((node) => {
      return {
        userId: workflow.userId,
        status: ExecutionPhaseStatus.PENDING,
        number: p.phase,
        node: JSON.stringify(node),
        name: TaskRegistry[node.data.type].label,
        workflowExecutionId: "",
      };
    });
  });

  console.log(date);

  // 2025-06-09T13:28:18.578Z
  const executionRes = await fetch(`${BACKEND_URL}/execution`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      execution: {
        workflowId,
        userId: workflow.userId,
        status: WorkflowExecutionStatus.RUNNING,
        startedAt: date,
        createdAt: date,
        trigger: WorkflowExecutionTrigger.MANUAL,
        phases: [],
        definition: flowDefinition ? flowDefinition : "{}",
      },
      phases,
    }),
  });

  const execution = await executionRes.json();
  if (!execution.id) {
    throw new Error("workflow execution failed");
  }

  executeWorkflow(execution.id);

  return `/workflow/runs/${workflowId}/${execution.id}`;
}
