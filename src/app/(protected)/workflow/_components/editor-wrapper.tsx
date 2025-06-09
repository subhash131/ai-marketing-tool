"use client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import Editor from "./editor";
import TaskComponentsBar from "./components-bar";

const EditorWrapper = () => {
  return (
    <ReactFlowProvider>
      <TaskComponentsBar />
      <Editor />
    </ReactFlowProvider>
  );
};

export default EditorWrapper;
