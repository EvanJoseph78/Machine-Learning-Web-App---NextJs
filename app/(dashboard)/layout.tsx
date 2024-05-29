import SideBar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-dark-color">
      <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">

        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
