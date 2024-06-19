
"use client"

import { UserButton } from "@clerk/clerk-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { HomeIcon, Search, UserRound } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";


export const NavbarRoutes = () => {

  const router = useRouter();

  const adminUserId = "user_2h66pveKdZAu3AjnVfyLEuCQBSn";

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  const userInfo = useUser();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    console.log(userInfo.user?.id);

    if (userInfo.user) {
      setIsLoged(true);
    } else {
      setIsLoged(false);
    };

    if (adminUserId === userInfo.user?.id) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [userInfo])

  return (
    <div className="w-full flex justify-between">
      <div>
        <Link href={"/courses"}>
          <Button size={"sm"}>
            Cursos
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">

        {isAdmin && (
          <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isPlayerPage ? (
              <Link href={"/"}>
                <Button size={"sm"} variant={"ghost"}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </Link>
            ) : (
              <Link href={"/teacher/courses"}>
                <Button size={"sm"}>
                  Modo Professor
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* se não houver usuário logado mostra ícone para logar */}
        {!isLoged ? (
          <Popover>
            <PopoverTrigger>
              <UserRound size={40} />
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <p className="hover:text-vermelho-vinho transition duration-300 ease-in-out cursor-pointer " onClick={() => { router.push("/sign-in") }}>Login</p>
              <p className="hover:text-vermelho-vinho transition duration-300 ease-in-out cursor-pointer " onClick={() => { router.push("/sign-up") }}>Criar Conta</p>
            </PopoverContent>
          </Popover>
        ) : (
          <UserButton
            afterSignOutUrl="/courses"
          ></UserButton>
        )}

      </div>
    </div>
  );
};
