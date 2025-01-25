"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGetCourse } from "@/services/api";
import { Course } from "@prisma/client";
import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CourseCardInfo } from "../_components/course-card-info";
import { CourseWithTags } from "@/lib/types";

interface CourseProps {
  params: {
    slug: string; // Identificador único do curso
  };
}

const CoursePage = ({ params }: CourseProps) => {

  const [course, setCourse] = useState<CourseWithTags>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Redireciona o usuário para a página do curso
  const handleRedirect = () => {
    toast.success("Iniciando o curso...");
    console.log(course)
    // router.push(`/student/course/${params.}`);
  };


  // Busca o curso com base no ID
  const getCourse = async () => {
    console.log(isLoading)
    try {
      const courseId = extractId(params.slug); // Extrai o ID do slug
      const response: CourseWithTags = await fetchGetCourse(courseId); // Faz a requisição
      setCourse(response); // Atualiza o estado com os dados do curso
      console.log(course);
    } catch (error) {
      console.error("Erro ao buscar o curso:", error);
      toast.error("Não foi possível carregar o curso.");
    } finally {
      setIsLoading(false); // Garante que o carregamento seja encerrado
    }
  };

  useEffect(() => {
    getCourse();
  }, [isLoading])

  const extractId = (slug: string): string => {
    const parts = slug.split("-");
    return parts[parts.length - 1]; // Retorna o último elemento do array
  };

  if (isLoading && course == null) {
    return SkeletonCoursePage();
  }

  return (
    <div className="h-full">
      <main className="min-h-screen mt-16 px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-48 py-8 flex justify-between flex-col md:flex-row space-y-4">
        <div className="md:w-2/3 md:px-4 space-y-4">
          <div>
            <h1 className="text-5xl font-bold mt-4">{course?.title}</h1>
            <div className="border-t border-gray-200 my-4"></div>
            <p>{course?.description}</p>
            <Button className="w-32 mt-4" onClick={handleRedirect}>Iniciar</Button>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="pt-8">{course?.introduction}</div>
          </div>
        </div>
        {course ? (
          <CourseCardInfo course={course} />
        ) : (
          <p>Carregando...</p>
        )}
        <div className="border-t border-gray-200 my-4"></div>
      </main >
    </div>
  );
}

export default CoursePage;

function SkeletonCoursePage() {
  return (
    <div className="h-full">
      <main className="min-h-screen mt-16 px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-48 py-8 flex justify-between flex-col md:flex-row space-y-4">
        <div className="md:w-2/3 md:px-4 space-y-4">
          <div>
            <Skeleton> <h1 className="text-5xl font-bold mt-4 invisible">Curso Básico de Machine Learning</h1> </Skeleton>
            <div className="border-t border-gray-200 my-4"></div>
            <Skeleton> <p className="invisible h-24">Olá aluno(a), seja bem-vindo(a) ao curso de Inteligência Artificial. Este projeto surgiu com o intuito de proporcionar um aprendizado de qualidade para pessoas que desejam explorar o fantástico mundo da programação e do Machine Learning. Aqui você poderá aprender diversos conceitos e praticar com as atividades que disponibilizaremos ao longo dos módulos.</p> </Skeleton>
            <Button className="w-32 mt-4 cursor-default">Carregando...</Button>
            <div className="border-t border-gray-200 my-4"></div>
          </div>

        </div>
        <div className="border-t border-gray-200 my-4"></div>
      </main >
    </div>
  );
}

