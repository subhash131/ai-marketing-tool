import { Button } from "@/components/ui/button";
import { parseTimestamp } from "@/lib/utils";
import { Workflow } from "@/types/workflow";
import { Logs, Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

const WorkflowCard = ({
  description,
  name,
  status,
  userId,
  lastRunAt,
  lastRunStatus,
  id,
}: Workflow) => {
  return (
    <div className="rounded-md h-60 p-1 bg-sidebar-accent shadow hover:rotate-1 transition-transform">
      <div className="bg-sidebar size-full rounded-sm border p-2 flex flex-col justify-between">
        <div className="w-full ">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">{name}</p>
            <div className="text-xs px-4 py-1 rounded-full bg-accent">
              {status as any}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>Last run: {lastRunAt && parseTimestamp(lastRunAt)}</p>
            <div className="flex items-center justify-center gap-1">
              <div className="p-1 rounded-full bg-green-500" />
              <p className="text-foreground rounded-full">{lastRunStatus}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button asChild>
              <Link href={`/workflow/${id}`} className="cursor-pointer">
                Edit <Pencil />
              </Link>
            </Button>
            <Button className="cursor-pointer bg-sidebar-accent text-accent-foreground border hover:bg-accent">
              Logs <Logs />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
