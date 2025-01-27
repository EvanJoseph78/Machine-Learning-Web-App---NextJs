
"use client";

import { fetchUserSignUp } from "@/services/api";
import { errorMessages } from "@/utils/errorMessages";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// componente responsável pela criação do usuário no banco de dados da aplicação
export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user } = useUser(); // Acessa informações do usuário logado

  const signUpUser = async (userClerkId: string, fullname: string) => {
    try {
      const response = await fetchUserSignUp(userClerkId, fullname);
      if (response === errorMessages.USER_ALREADY_SUBSCRIBED) {
        console.log(errorMessages.USER_ALREADY_SUBSCRIBED);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSignedIn && user) {
      if (user.fullName) {
        signUpUser(user.id, user.fullName);
      } else {
        signUpUser(user.id, "");
      }
    }
  }, [isSignedIn, user]); // Escuta mudanças no estado de login ou no usuário

  return <>{children}</>;
}
