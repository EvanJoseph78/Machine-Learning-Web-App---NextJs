import { NavbarRoutes } from "@/components/navbar-routes";

export const Navbar = () => {
  return (
    <div className="border fixed px-2 py-4 w-full bg-white dark:bg-dark-color">
      <NavbarRoutes></NavbarRoutes>
    </div>
  );
}
