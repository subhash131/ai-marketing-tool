"use client";
import { List } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Link
      href={`/workflow/runs/${workflowId}`}
      className="flex items-center text-nowrap bg-sidebar rounded-md px-4 py-1.5 h-fit border gap-2"
    >
      <List size={18} />
      Executions
    </Link>
  );
};

export default NavigationTabs;
