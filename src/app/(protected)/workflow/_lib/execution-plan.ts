import { FlowNode } from "@/types/flow-node";
import {
  WorkFlowExecutionPlan,
  WorkFlowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { Inconsolata } from "next/font/google";
import { TaskRegistry } from "./registry/task-registry";

type FlowToExecutionPlan = {
  executionPlan?: WorkFlowExecutionPlan;
};

export function FlowToExecutionPlan(
  nodes: FlowNode[],
  edges: Edge[]
): FlowToExecutionPlan {
  const targetNodeIds = new Set(edges.map((edge) => edge.target));
  const entryNode = nodes.filter((node) => !targetNodeIds.has(node.id));

  console.log(entryNode);
  if (entryNode.length > 1) {
    throw new Error("Workflow has multiple entry points");
  }
  if (entryNode.length === 0) {
    throw new Error("Workflow has no entry point");
  }

  const planned = new Set<string>();

  const executionPlan: WorkFlowExecutionPlan = [
    {
      phase: 1,
      nodes: entryNode,
    },
  ];

  planned.add(entryNode[0].id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkFlowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // If all incoming incomers/edges are planned and there are still invalid inputs
          // this means that this particular node has an invalid input
          // which means that the workflow is invalid
          console.log("invalid inputs", currentNode.id, invalidInputs);
          // TODO: Handle error
          throw new Error("Invalid workflow");
        } else {
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }
  return { executionPlan };
}

function getInvalidInputs(node: FlowNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }
    invalidInputs.push(input);
  }

  return invalidInputs;
}
