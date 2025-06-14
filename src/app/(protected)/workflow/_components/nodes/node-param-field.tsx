import { TaskParam, TaskParamType } from "@/types/flow-node";
import React, { useCallback } from "react";
import StringParam from "./param/string-param";
import { useReactFlow } from "@xyflow/react";
import BrowserInstanceParam from "./param/browser-instance-param";
import SelectParam from "./param/select-param";

const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
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
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={value || ""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return <div>case not found</div>;
  }
};

export default NodeParamField;
