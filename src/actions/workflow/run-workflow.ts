"use server";

import { FlowToExecutionPlan } from "@/app/(protected)/workflow/_lib/execution-plan";
import { TaskRegistry } from "@/app/(protected)/workflow/_lib/registry/task-registry";
import { WorkFlowExecutionPlan } from "@/types/workflow";

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
    console.log({ p: JSON.stringify(p) });
    return p.nodes.map((node) => {
      return {
        userId: workflow.userId,
        status: "CREATED",
        number: p.phase,
        node: JSON.stringify(node),
        name: TaskRegistry[node.data.type].label,
        workflowExecutionId: "",
      };
    });
  });

  console.log({ phases });

  // return;
  const executionRes = await fetch(`${BACKEND_URL}/execution`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      execution: {
        workflowId,
        userId: workflow.userId,
        status: "PENDING",
        startedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        trigger: "manual",
        phases: [],
      },
      phases,
    }),
  });

  const data = executionRes.json();
  console.log({ executionRes: data });
  if (!data) throw new Error("workflow execution failed");
  return data;
}
