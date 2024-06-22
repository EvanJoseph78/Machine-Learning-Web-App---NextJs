
import { Navbar } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (

    <div className="h-full w-full dark:bg-dark-color flex flex-row">

      <div className="h-[80px] fixed inset-y-0 w-full xl:w-2/3 z-50 bg-gray-50 dark:bg-dark-color ">
        <Navbar></Navbar>
      </div>

      <main className="pt-[80px] h-full w-full flex flex-col xl:w-2/3 ">
        {children}
      </main>
    </div>
  );

};
export default DashboardLayout;
