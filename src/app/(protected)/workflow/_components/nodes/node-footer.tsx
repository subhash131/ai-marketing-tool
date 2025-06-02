import React from "react";

const NodeFooter = () => {
  return (
    <div className="w-full h-fit">
      <label className="text-xs">Result</label>
      <pre className="text-xs">
        {JSON.stringify({ name: "subhash" }, null, 2)}
      </pre>
    </div>
  );
};

export default NodeFooter;
