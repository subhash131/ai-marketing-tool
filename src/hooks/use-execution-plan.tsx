import { FlowToExecutionPlan } from "@/app/(protected)/workflow/_lib/execution-plan";
import { FlowNode } from "@/types/flow-node";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = FlowToExecutionPlan(nodes as FlowNode[], edges);
    return executionPlan;
  }, [toObject]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
