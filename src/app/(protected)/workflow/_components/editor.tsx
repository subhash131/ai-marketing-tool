"use client";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";
import TopBar from "./top-bar";
import { useQuery } from "@tanstack/react-query";
import { getWorkflowById } from "@/actions/workflow/get-workflow-by-id";
import { toast } from "sonner";
import { createFlowNode } from "../_lib/create-workflow-node";
import { FlowNode, TaskType } from "@/types/flow-node";
import DeletableEdge from "./edges/deletable-edge";

const nodeType = {
  FlowScrapeNode: NodeComponent,
};
const edgeType = {
  default: DeletableEdge,
};

const fitViewOptions = { padding: 1, duration: 200 };

const Editor = () => {
  const id = useParams().id as string;
  const { data, isLoading, isFetched, isError, isPending } = useQuery({
    queryKey: ["workflow", id],
    queryFn: () => getWorkflowById({ workflowId: id }),
  });
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    if (isError) toast.error("Failed to load workflow!");
    if (isLoading) toast.loading("loading...", { id: "loading-workflow" });
    if (!isPending) toast.dismiss("loading-workflow");
    if (!data || !data.definition) return;

    try {
      const flow = JSON.parse(data?.definition);
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (e) {
      console.log(e);
    }
  }, [isLoading, isPending, data, isError]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const taskType = e.dataTransfer.getData("application/reactflow");
    if (!taskType) return;
    const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });

    const newNode = createFlowNode({
      nodeType: taskType as TaskType,
      position,
    });
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edge) => addEdge({ ...connection, animated: true }, edge));
  }, []);

  if (!id) return;
  return (
    <div className="size-full ">
      <TopBar title={data?.name || "untitled"} subtitle="" workflowId={id} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeType}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        id={id}
        className="bg-red-500"
        nodeTypes={nodeType}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls
          position="top-left"
          orientation="vertical"
          className="text-black"
          fitViewOptions={fitViewOptions}
        />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Editor;
