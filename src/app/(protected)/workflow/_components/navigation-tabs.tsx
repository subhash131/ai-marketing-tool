"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Logs } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="flex items-center justify-center bg-sidebar p-2 border rounded-md ">
      <Tabs>
        <Link
          href={`/workflow/runs/${workflowId}`}
          className="flex items-center text-nowrap "
        >
          <TabsList className="gap-2 text-primary px-2">
            <Logs />
            Executions
          </TabsList>
        </Link>
      </Tabs>
    </div>
  );
};

export default NavigationTabs;
