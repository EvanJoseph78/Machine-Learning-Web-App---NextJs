
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SideBar } from "./sidebar";


export const MobileSidebar = () => {
  return (
    <Sheet>
      {/* change: now mobileSidebar is used on desktop version */}
      <SheetTrigger className=" pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};
