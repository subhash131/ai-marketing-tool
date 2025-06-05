import { Workflow } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="w-full px-10 py-4 flex gap-2 items-center">
      <Workflow />
      <label className="text-2xl">Workflows</label>
    </div>
  );
};

export default Header;
