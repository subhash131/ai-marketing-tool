import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useId, useState } from "react";
import { ParamProps } from "@/types/flow-node";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const StringParam = ({
  param,
  updateNodeParamValue,
  value,
  disabled,
}: ParamProps) => {
  const [nodeValue, setNodeValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setNodeValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-sm flex">
        {param?.name}
        {param?.required && <span className="text-red-500">*</span>}
      </Label>
      <Component
        id={id}
        value={nodeValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNodeValue(e.target.value)
        }
        onBlur={() => updateNodeParamValue(nodeValue)}
        placeholder={disabled ? "linked" : param.helperText}
        disabled={disabled}
        className={cn(disabled && "resize-none max-h-10", "!bg-background")}
      />
    </div>
  );
};

export default StringParam;
