"use client";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";
import TopBar from "./top-bar";
import { useQuery } from "@tanstack/react-query";
import { getWorkflowById } from "@/actions/workflow/get-workflow-by-id";
import { toast } from "sonner";

const nodeType = {
  FlowScrapeNode: NodeComponent,
};

const fitViewOptions = { padding: 1, duration: 200 };

const Editor = () => {
  const id = useParams().id as string;
  const { data, isLoading, isFetched, isError, isPending } = useQuery({
    queryKey: ["workflow", id],
    queryFn: () => getWorkflowById({ workflowId: id }),
  });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

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

  if (!id) return;

  return (
    <div className="size-full ">
      {/* TODO:: */}
      <TopBar title="" subtitle="" workflowId={id} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        id={id}
        className="bg-red-500"
        nodeTypes={nodeType}
        fitViewOptions={fitViewOptions}
        fitView
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
