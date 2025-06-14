"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import ComponentBarProvider from "./component-bar-provider";
import { PanelRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { TaskType } from "@/types/flow-node";
import { TaskRegistry } from "../../_lib/registry/task-registry";
import { Button } from "@/components/ui/button";

//Task menu
const TaskComponentsBar = () => {
  return (
    <ComponentBarProvider>
      <div className="absolute size-fit right-2 top-2 rounded-tr-md w-fit z-50 cursor-pointer items-center justify-center">
        <SidebarTrigger className="cursor-pointer bg-sidebar border px-4 w-60 h-10 gap-4 flex items-center">
          COMPONENTS <PanelRight />
        </SidebarTrigger>
      </div>
      <Sidebar variant="floating" collapsible="offcanvas" side="right">
        <SidebarContent className="hide-scrollbar p-2 pt-10">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["extraction", "interactions", "webhooks"]}
          >
            <AccordionItem value="extraction">
              <AccordionTrigger className="font-semibold px-2">
                Web Scrapper
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 text-balance transition-all">
                <TaskMenuBtn taskType={TaskType.LAUNCH_BROWSER} />
                <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
                <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="interactions">
              <AccordionTrigger className="font-semibold px-2">
                User Interaction
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 text-balance">
                <TaskMenuBtn taskType={TaskType.FILL_INPUT} />
                <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="timing">
              <AccordionTrigger className="font-semibold px-2">
                Timing controls
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 text-balance">
                <TaskMenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="webhooks">
              <AccordionTrigger className="font-semibold px-2">
                Webhook
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 text-balance">
                <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarContent>
      </Sidebar>
    </ComponentBarProvider>
  );
};

export default TaskComponentsBar;

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  const onDragStart = (e: React.DragEvent, type: TaskType) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      variant="secondary"
      className="flex items-center justify-between gap-2 border w-full cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  );
}
