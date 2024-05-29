import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const SideBar = () => {
  return (
    <div className="h-full justify-between border-r flex flex-col overflow-y-auto shadow-sm pt-6 bg-white dark:bg-dark-color">
      <div className="p-x6 h-full space-y-6">
        <Logo />
        <div className="flex flex-col w-full h-full">
          <SidebarRoutes />
        </div>
      </div>

      <div className="w-full p-6 flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
};

