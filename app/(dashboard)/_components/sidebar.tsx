import { ModeToggle } from "@/components/mode-toggle";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      sidebar
      <ModeToggle />
    </div>
  );
};

export default SideBar;
