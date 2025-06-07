"use client";
import { FlowNodeMissingInputs } from "@/types/flow-node";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";

type FlowValidationContextType = {
  invalidInputs: FlowNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<FlowNodeMissingInputs[]>>;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>({
    invalidInputs: [],
    setInvalidInputs: () => {},
    clearErrors: () => {},
  });

export function FlowValidationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [invalidInputs, setInvalidInputs] = useState<FlowNodeMissingInputs[]>(
    []
  );
  const clearErrors = () => {
    setInvalidInputs([]);
  };
  return (
    <FlowValidationContext.Provider
      value={{ invalidInputs, setInvalidInputs, clearErrors }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
}
