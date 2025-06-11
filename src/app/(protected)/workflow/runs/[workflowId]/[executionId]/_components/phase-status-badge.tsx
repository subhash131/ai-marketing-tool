import { ExecutionPhaseStatus } from "@/types/workflow";
import { CircleCheck, CircleDashed, CircleX, Loader2 } from "lucide-react";
import React from "react";

const PhaseStatusBadge = ({ status }: { status: ExecutionPhaseStatus }) => {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashed size={20} className="stroke-muted-foreground" />;
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2 size={20} className="animate-spin stroke-yellow-500" />;
    case ExecutionPhaseStatus.FAILED:
      return <CircleX size={20} className="stroke-destructive" />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheck size={20} className="stroke-green-500" />;
    default:
      return <div className="rounded-full py-1 px-2">{status}</div>;
  }
};

export default PhaseStatusBadge;
