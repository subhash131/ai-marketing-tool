import { getCredentialsByUserId } from "@/actions/workflow/get-credentials-by-user-id";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParamProps } from "@/types/flow-node";
import { useQuery } from "@tanstack/react-query";
import React, { useId } from "react";

const CredentialsParam = ({
  param,
  updateNodeParamValue,
  value,
}: ParamProps) => {
  const id = useId();
  const { data } = useQuery({
    queryKey: ["credentials"],
    queryFn: async () =>
      await getCredentialsByUserId("683c2c052507b4cdade10e0d"),
  });
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        onValueChange={(value) => updateNodeParamValue(value)}
        defaultValue={value}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Credential" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>

            {data?.map((credential) => {
              return (
                <SelectItem key={credential.id} value={credential.id!}>
                  {credential.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CredentialsParam;
