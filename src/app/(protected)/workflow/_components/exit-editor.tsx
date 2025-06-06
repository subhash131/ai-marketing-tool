import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ExitEditor = () => {
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="cursor-pointer p-2 bg-muted rounded-md"
          onClick={() => {
            router.back();
          }}
        >
          <X size={20} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Exit</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ExitEditor;
