import { Button } from "@/components/ui/button";
import { Instructor } from "@prisma/client";
import Link from "next/link";
import { ProjectAuthors } from "./_components/project-authors";

const Home = () => {
  const authors: Instructor[] = [
    {
      name: "Evandro Mariano",
      formation1: "Bacharel em Sistemas de Informação",
      profileUrl: "https://machine-learning3.vercel.app/assets/img/Evandro.png",
      id: "",
      formation2: null,
      courseId: null,
    },
    {
      name: "Antônio Lucas",
      formation1: "Bacharel em Sistemas de Informação",
      profileUrl: "https://machine-learning3.vercel.app/assets/img/Lucas.png",
      id: "",
      formation2: null,
      courseId: null,
    },
    {
      name: "Iago de Oliveira",
      formation1: "Bacharel em Sistemas de Informação",
      profileUrl: "https://machine-learning3.vercel.app/assets/img/Iago.jpg",
      id: "",
      formation2: null,
      courseId: null,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <header className="flex flex-col justify-center items-center py-16 px-2 gap-4">
        <h1 className="text-4xl font-semibold text-center">
          Sejam muito bem-vindos
        </h1>
        <p className="max-w-[600px] text-center">
          Acesse cursos gratuitos sobre tecnologia criados por alunos para
          alunos.
        </p>
        <div className="space-x-2">
          <Link href={"/ufpa-educa/courses"}>
            <Button>Iniciar</Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button variant={"ghost"} className="border">
              Login
            </Button>
          </Link>
        </div>
      </header>

      <div className="px-2 text-center">
        <h1 className="text-3xl font-bold mb-4">Sobre a Plataforma</h1>

        <p className="text-lg mb-8 text-center max-w-2xl">
          O nosso projeto tem como objetivo oferecer cursos de Machine Learning
          para a comunidade interna e externa de Castanhal. Na plataforma, os
          usuários podem acessar esses cursos de forma gratuita. No futuro,
          pretendemos democratizar ainda mais a criação de cursos, permitindo
          que qualquer aluno interessado possa criar e disponibilizar seus
          próprios cursos na plataforma.
        </p>
      </div>

      <div className="flex justify-center items-center w-full px-16 flex-col border-t py-8">
        <h1 className="text-3xl font-bold mb-4">Autores do projeto</h1>
        <ProjectAuthors authorsList={authors}></ProjectAuthors>
      </div>
    </div>
  );
};

export default Home;
