import { AppSidebar } from "@/app/(protected)/_components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { PanelLeftIcon } from "lucide-react";

export default async function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="size-full">
        <SidebarTrigger className="absolute bottom-40 z-50">
          <span className="cursor-pointer p-2 rounded-r-md dark:bg-[#171717] bg-[#FAFAFA]">
            <PanelLeftIcon />
          </span>
        </SidebarTrigger>
        <div className="h-screen w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
