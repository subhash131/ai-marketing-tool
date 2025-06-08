import { FlowNode, FlowNodeMissingInputs } from "@/types/flow-node";
import {
  WorkFlowExecutionPlan,
  WorkFlowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./registry/task-registry";

export enum FlowToExecutionPlanValidationError {
  "NO_ENTRY_POINT" = "NO_ENTRY_POINT",
  "INVALID_INPUTS" = "INVALID_INPUTS",
}

export type FlowToExecutionPlan = {
  executionPlan?: WorkFlowExecutionPlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: FlowNodeMissingInputs[];
  };
};

export function FlowToExecutionPlan(
  nodes: FlowNode[],
  edges: Edge[]
): FlowToExecutionPlan {
  const targetNodeIds = new Set(edges.map((edge) => edge.target));
  const entryNode = nodes.filter((node) => !targetNodeIds.has(node.id));

  if (entryNode.length === 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const inputsWithErrors: FlowNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInputs(entryNode[0], edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryNode[0].id,
      inputs: invalidInputs,
    });
  }

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

          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
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
  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    };
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
    invalidInputs.push(input.name);
  }

  return invalidInputs;
}

function getIncomers(node: FlowNode, nodes: FlowNode[], edges: Edge[]) {
  if (!node.id) {
    return [];
  }
  const incomersIds = new Set<string>();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });
  return nodes.filter((node) => incomersIds.has(node.id));
}
