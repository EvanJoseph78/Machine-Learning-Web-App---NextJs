import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Navbar } from "./_components/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <div>
        <Navbar></Navbar>
      </div>
      <div className="h-full py-12">{children}</div>
    </>
  );
}
