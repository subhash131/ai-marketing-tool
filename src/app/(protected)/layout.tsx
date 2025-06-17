import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="size-full">{children}</div>;
};

export default ProtectedLayout;
