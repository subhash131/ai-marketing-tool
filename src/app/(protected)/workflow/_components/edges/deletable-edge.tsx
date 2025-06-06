"use client";
import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { X } from "lucide-react";
import React from "react";

const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
        className="group pointer-events-auto"
      />
      <EdgeLabelRenderer>
        <div
          className="absolute bg-background"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant="outline"
            size="icon"
            className="size-5 rounded-full border cursor-pointer text-xs leading-none p-2 hover:scale-150 transition-transform hover:opacity-100 opacity-50"
            onClick={() => {
              setEdges((eds) => eds.filter((ed) => ed.id !== props.id));
            }}
          >
            <X />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;
