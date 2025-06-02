import { TaskType } from "@/types/flow-node";
import React from "react";
import { TaskRegistry } from "../../_lib/registry/task-registry";
import { Check, Globe, Play } from "lucide-react";

type props = {
  taskType: TaskType;
};

const NodeHeader = ({ taskType }: props) => {
  const task = TaskRegistry[taskType];
  console.log(task);
  return (
    <div className="w-full flex flex-col border-b px-2 py-1 gap-2 cursor-grab active:cursor-grabbing drag-handle">
      <div className=" flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Globe size={14} />
          <p className="text-sm">{task.label}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="relative text-green-500 px-1 py-0.5 overflow-hidden rounded-xs">
            <span className="size-full absolute top-0 left-0 bg-green-500 opacity-30" />
            <Check size={14} />
          </div>
          <button className="px-1 py-0.5 rounded-xs dark:bg-[#1f1f1f] bg-[#e9e9e9]">
            <Play size={14} />
          </button>
        </div>
      </div>
      <div>
        <p className="text-[0.5rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, sit?
        </p>
      </div>
    </div>
  );
};

export default NodeHeader;
