"use client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import Editor from "./editor";

const EditorWrapper = () => {
  return (
    <ReactFlowProvider>
      <Editor />
    </ReactFlowProvider>
  );
};

export default EditorWrapper;
