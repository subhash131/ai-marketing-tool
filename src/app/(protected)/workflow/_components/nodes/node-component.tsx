import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { FlowNodeData } from "@/types/flow-node";
import { TaskRegistry } from "../../_lib/registry/task-registry";
import NodeInputs, { NodeInput } from "./node-body";
import NodeFooter from "./node-footer";

const NodeComponent = memo((props: NodeProps) => {
  const data = props.data as FlowNodeData;
  const task = TaskRegistry[data.type];
  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={data.type} />
      <NodeInputs>
        {task.input.map((input) => {
          return <NodeInput input={input} key={input.name} nodeId={props.id} />;
        })}
      </NodeInputs>
      <NodeFooter />
    </NodeCard>
  );
});
export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
