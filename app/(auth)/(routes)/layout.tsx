import { Navbar } from "@/app/(dashboard)/_components/navbar";

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="">
      <Navbar></Navbar>

      <div
        className="h-full items-center justify-center flex flex-col mt-36"
      >
        {children}</div >
    </div>
  );
};

export default AuthLayout;
