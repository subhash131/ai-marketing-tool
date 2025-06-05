import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import ComponentBarProvider from "./component-bar-provider";
import {
  Calendar,
  Home,
  Inbox,
  PanelRight,
  Search,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const ComponentsBar = () => {
  return (
    <ComponentBarProvider>
      <div className="absolute size-fit right-2 top-2 rounded-tr-md w-fit z-50 cursor-pointer items-center justify-center">
        <SidebarTrigger className="cursor-pointer bg-sidebar border px-4 w-60 h-10 gap-4 flex items-center">
          COMPONENTS <PanelRight />
        </SidebarTrigger>
      </div>
      <Sidebar variant="floating" collapsible="offcanvas" side="right">
        <SidebarContent className="pt-10 hide-scrollbar">
          <SidebarGroup>
            <SidebarGroupLabel>Workflow</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, i) => (
                  <SidebarMenuItem key={item.title + i}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </ComponentBarProvider>
  );
};

export default ComponentsBar;
