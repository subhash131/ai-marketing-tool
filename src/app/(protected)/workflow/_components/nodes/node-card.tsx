"use client";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { ReactNode } from "react";

type Props = {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
};

const NodeCard = ({ nodeId, children, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { measured, position } = node;
        if (!measured || !position) return;

        const x = position.x + measured.width! / 2;
        const y = position.y + measured.height! / 2;

        if (x === undefined || y === undefined) return;

        setCenter(x, y, { duration: 500, zoom: 1 });
      }}
      className={cn(
        "cursor-default rounded-md p-2 border active:border-2 dark:bg-[#18181B] bg-[#ffffff] w-80",
        isSelected && "border-blue-500"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
