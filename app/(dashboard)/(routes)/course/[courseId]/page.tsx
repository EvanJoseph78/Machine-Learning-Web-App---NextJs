"use client"

// Importações necessárias
import { Courses, Instructors } from "@prisma/client";
import { CourseCard, SkeletonCourseCard } from "./_components/course-card";
import { useEffect, useState } from "react";
import { InstructorCard, SkeletonInstructorCard } from "./_components/instructores-card";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchCourse, fetchIsUserSubscribed, fetchRegisterUser, fetchSubscribeCourse } from "@/services/api";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";

// Interface das propriedades do componente
interface CourseIdProps {
  params: {
    courseId: string;
  };
}

// Componente principal
const CoursePage: React.FC<CourseIdProps> = ({ params }) => {

  const user = useUser(); // Hook para obter o usuário autenticado
  const [course, setCourse] = useState<Courses>(); // Estado para armazenar os dados do curso
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para gerenciar o carregamento
  const [instructors, setInstructors] = useState<Instructors[]>(); // Estado para armazenar os instrutores do curso
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false); // Estado para verificar se o usuário está autenticado
  const [isUserSubscribedInCourse, setIsUserSubscribedInCourse] = useState<boolean>(false); // Estado para verificar se o usuário está inscrito no curso
  const router = useRouter(); // Hook para navegação

  // Função para buscar os dados do curso
  const getCourse = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCourse(params.courseId);
      setCourse(data);
      setInstructors(data.instructors)
    } catch (error) {
      console.error('Erro ao buscar o curso:', error);
    }
  };

  // Função para registrar o usuário no banco de dados
  const handleUserAuth = async () => {
    setIsLoading(true);
    if (user && user.user && user.user.fullName) { // Verifica se há um usuário autenticado
      const userId = user.user.id;
      const fullName = user.user.fullName;
      try {
        await fetchRegisterUser(userId, fullName);
        setIsUserAuthenticated(true);
      } catch (err) {
        console.error("Erro interno ao registrar usuário:", err);
        setIsUserAuthenticated(false);
      }

      setIsLoading(false);

    } else {
      console.log("Usuário não autenticado ou dados de usuário não encontrados.");
      setIsUserAuthenticated(false);
    }
  };

  // Função para inscrever o usuário no curso
  const handleSubscribeCourse = async () => {
    setIsLoading(true);
    toast.success("Inscrevendo-se")
    if (user.user) { // Verifica se há um usuário autenticado
      const userId = user.user.id;
      try {
        await fetchSubscribeCourse(params.courseId, userId);
        setIsUserSubscribedInCourse(true);
      } catch (err) {
        console.error("Erro ao inscrever no curso:", err);
      }
    } else {
      console.log("Usuário não autenticado ou dados de usuário não encontrados.");
    }
    setIsLoading(false);
    toast.success("Inscrição realizada com sucesso");
  };

  // Função para verificar se o usuário está inscrito no curso
  const handleIsUserSubscribed = () => {
    fetchIsUserSubscribed(params.courseId).then((data) => {
      if (data) {
        setIsUserSubscribedInCourse(true);
      } else {
        setIsUserSubscribedInCourse(false);
      };
    }).catch((err) => {
      console.log(err);
    });
    setIsLoading(true);

  }

  // Função para redirecionar o usuário para a página do curso
  const handleRedirect = () => {
    toast.success("Iniciando...")
    router.push(`/student/course/${params.courseId}`);
  }

  // Hook useEffect para buscar os dados do curso e registrar o usuário
  useEffect(() => {
    getCourse(); // Chama a função para buscar os dados do curso
    handleUserAuth(); // Chama a função para registrar o usuário
    handleIsUserSubscribed(); // Chama a função para verificar a inscrição do usuário
  }, [params.courseId, user.isSignedIn]);

  // Renderização do componente
  return (
    <div className="w-full">
      <main className="min-h-screen mt-16 px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-48 py-8 flex justify-between flex-col md:flex-row space-y-4">
        <div className="md:w-2/3 md:px-4 space-y-4">

          {isLoading ? (
            <div className="space-y-2 mt-4">
              <Skeleton className="w-full h-24 text-5xl text-bold pb-4"></Skeleton>
              <div className="border-t border-gray-200 my-4"></div>
              <Skeleton className="w-full h-32 text-5xl text-bold pb-4"></Skeleton>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl text-bold mt-4">{course?.courseTitle}</h1>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="">{course?.introduction}</p>
            </div>
          )}

          <div className="border-t border-gray-200 my-4"></div>
          {isLoading ? (
            <Button className="w-32">
              <Spinner /> {/* Componente de carregamento */}
            </Button>
          ) : (
            !isUserAuthenticated ? (
              <Button className="w-32" onClick={() => { router.push("/sign-in") }}>Login</Button> // Botão de login
            ) : (
              !isUserSubscribedInCourse ? (
                <Button className="w-32" onClick={() => { handleSubscribeCourse() }}>Inscrever-se</Button> // Botão de inscrição
              ) : (
                <Button className="w-32" onClick={handleRedirect}>Iniciar</Button> // Botão para iniciar o curso
              )
            )
          )}

          <div className="border-t border-gray-200 my-4"></div>

          {isLoading ? (
            <Skeleton className="w-full h-60"></Skeleton>
          ) : (
            <div className="pt-8">
              {course?.description}
            </div>
          )}

        </div>

        {course ? (
          <CourseCard
            courseId={course?.id}
            courseName={course.courseTitle}
            discipine={course.subject}
            linkCover={course.imageUrl}
            topics={course.tags}
            workload={course.duration}
            courseSubject={course.subject}
            difficulty={course.level}
            certificate={course.certificate}
          />
        ) : (
          <SkeletonCourseCard />
        )}
      </main>

      <div className="w-full bg-dark-color text-white min-h-96 py-8 border-y">
        <h1 className="text-5xl text-center">Instrutores</h1>
        <div className="flex mt-8 gap-32 flex-wrap justify-center">
          {instructors ? (
            instructors.map((instructor) => (
              <InstructorCard
                instructorName={instructor.name}
                formation1={instructor.formation1}
                formation2={instructor.formation2}
                profilePictureUrl={instructor.profileUrl}
                key={instructor.id}
              />
            ))
          ) : (
            <div className="flex mt-8 gap-32 flex-wrap justify-center">
              <SkeletonInstructorCard />
              <SkeletonInstructorCard />
              <SkeletonInstructorCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
