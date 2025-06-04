import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useId, useState } from "react";
import { ParamProps } from "@/types/flow-node";

const StringParam = ({ param, updateNodeParamValue, value }: ParamProps) => {
  const [nodeValue, setNodeValue] = useState(value);
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-sm flex">
        {param?.name}
        {param?.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        value={nodeValue}
        onChange={(e) => setNodeValue(e.target.value)}
        onBlur={() => updateNodeParamValue(nodeValue)}
      />
      {param.helperText && (
        <p className="text-muted-foreground text-xs">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
