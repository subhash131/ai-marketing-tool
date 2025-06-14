import { ParamProps, TaskParam } from "@/types/flow-node";
import React from "react";

const BrowserInstanceParam = ({ param }: ParamProps) => {
  return <p className="text-xs h-10">{param.name}</p>;
};

export default BrowserInstanceParam;
