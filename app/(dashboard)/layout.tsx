import { Navbar } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-dark-color">

      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      {/* <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50"> */}
      {/*   <SideBar /> */}
      {/* </div> */}

      <main className="pt-[80px] h-full items-center content-center justify-center px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-48">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
