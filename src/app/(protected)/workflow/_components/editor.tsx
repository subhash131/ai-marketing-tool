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
import { createFlowNode } from "../_lib/create-workflow-node";
import { TaskType } from "@/types/flow-node";
import NodeComponent from "./nodes/node-component";
import ComponentsBar from "./components-bar";
import TopBar from "./top-bar";

const nodeType = {
  FlowScrapeNode: NodeComponent,
};

const fitViewOptions = { padding: 1, duration: 200 };

const Editor = () => {
  const id = useParams().id as string;
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode({ nodeType: TaskType.LAUNCH_BROWSER }),
    createFlowNode({ nodeType: TaskType.LAUNCH_BROWSER }),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "1", source: "1", target: "2" },
  ]);

  if (!id) return;

  return (
    <div className="size-full">
      <ComponentsBar />
      <TopBar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        id={id}
        className="bg-red-500"
        nodeTypes={nodeType}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls
          position="top-left"
          orientation="vertical"
          className="text-black !left-16"
          fitViewOptions={fitViewOptions}
        />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Editor;
