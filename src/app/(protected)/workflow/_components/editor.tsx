"use client";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useParams } from "next/navigation";
import React from "react";

import "@xyflow/react/dist/style.css";

const Editor = () => {
  const id = useParams().id as string;
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Node 1" },
    },
    {
      id: "2",
      position: { x: 0, y: 0 },
      data: { label: "Node 1" },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  if (!id) return;

  return (
    <div className="size-full ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        id={id}
        className="bg-red-500"
      >
        <Controls position="top-left" className="text-black" />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Editor;
