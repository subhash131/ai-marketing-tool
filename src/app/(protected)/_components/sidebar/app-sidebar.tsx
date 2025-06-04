"use client";
import {
  Calendar,
  Home,
  Inbox,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import SidebarContextProvider from "./sidebar-context-provider";

// Menu items.
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

export function AppSidebar() {
  const { open } = useSidebar();
  const { setTheme, theme } = useTheme();

  return (
    <div className="absolute left-0 top-0 w-fit z-50">
      <Sidebar collapsible="icon">
        <div className="flex items-center gap-2 w-full pt-4 ml-2">
          <SidebarTrigger className="flex items-center justify-center">
            <Menu />
          </SidebarTrigger>
          <Label
            className={cn(
              `${open ? "opacity-100" : "opacity-0"}`,
              "transition"
            )}
          >
            Sidebar
          </Label>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workflow</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
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
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    onClick={() =>
                      setTheme((prev) => (prev === "light" ? "dark" : "light"))
                    }
                  >
                    <a href="#">
                      {theme === "light" && <Moon />}
                      {theme === "dark" && <Sun />}
                      <span>Change Mode</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
