import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";

const SidebarContextProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("app-sidebar-sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen} name="app-sidebar">
      {children}
    </SidebarProvider>
  );
};
4;

export default SidebarContextProvider;
