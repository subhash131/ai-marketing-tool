import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

const ComponentBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      name="workflow-components"
      className="absolute top-0 right-0 "
      defaultOpen
    >
      {children}
    </SidebarProvider>
  );
};

export default ComponentBarProvider;
