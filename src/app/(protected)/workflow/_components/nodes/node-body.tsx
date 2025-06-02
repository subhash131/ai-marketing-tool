import React from "react";

const NodeBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b flex flex-col gap-1">{children}</div>;
};
export default NodeBody;

export const NodeInput = ({
  name,
  type,
  helperText,
  required,
  hideHandle,
}: any) => {
  return (
    <div className="py-2">
      <pre className="text-xs">
        {JSON.stringify(
          { name, type, helperText, required, hideHandle },
          null,
          2
        )}
      </pre>
    </div>
  );
};
