import { AppSidebar } from "./app-sidebar";
import SidebarContextProvider from "./sidebar-context-provider";

export default async function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContextProvider>
      <AppSidebar />
      <main className="size-full">
        <div className="h-screen w-full">{children}</div>
      </main>
    </SidebarContextProvider>
  );
}
