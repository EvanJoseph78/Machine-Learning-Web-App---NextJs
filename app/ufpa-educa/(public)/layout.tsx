import { NavbarRoutes } from "@/components/navbar-routes";
import { AppSidebar } from "@/components/app-sidebar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-16">
        <div className="fixed flex justify-center z-50 w-full h-16 border-b px-2 bg-white dark:bg-dark-color">
          <NavbarRoutes></NavbarRoutes>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <AppSidebar></AppSidebar>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
