import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from "@/app/(protected)/workflow/_lib/execution-plan";
import { FlowNode } from "@/types/flow-node";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./use-flow-validation";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { clearErrors, setInvalidInputs } = useFlowValidation();

  const handleError = useCallback(
    (error: FlowToExecutionPlan["error"]) => {
      switch (error?.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error("Some inputs are missing");
          if (error.invalidElements) setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error("(debug:handleError)Something went wrong");
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as FlowNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();

    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
