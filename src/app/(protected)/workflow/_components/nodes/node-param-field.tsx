import { TaskParam, TaskParamType } from "@/types/flow-node";
import React, { useCallback } from "react";
import StringParam from "./param/string-param";
import { useReactFlow } from "@xyflow/react";
import BrowserInstanceParam from "./param/browser-instance-param";

const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId);
  const value = (node?.data?.inputs as any)[param.name] || "";

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...(node?.data?.inputs as any),
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, node?.data?.inputs, param.name, nodeId]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      break;
  }
};

export default NodeParamField;
