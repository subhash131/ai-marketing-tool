import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { FlowNodeData } from "@/types/flow-node";
import { TaskRegistry } from "../../_lib/registry/task-registry";
import NodeInputs, { NodeInput } from "./node-inputs";
import NodeOutputs, { NodeOutput } from "./node-outputs";

const NodeComponent = memo((props: NodeProps) => {
  const data = props.data as FlowNodeData;
  const task = TaskRegistry[data.type];
  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={data.type} />
      <NodeInputs>
        {task.inputs.map((input) => {
          return <NodeInput input={input} key={input.name} nodeId={props.id} />;
        })}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output) => {
          return <NodeOutput output={output} key={output.name} />;
        })}
      </NodeOutputs>
    </NodeCard>
  );
});
export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
