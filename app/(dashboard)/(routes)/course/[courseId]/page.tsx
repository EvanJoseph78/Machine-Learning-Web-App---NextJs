"use client";

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

// Interface das propriedades esperadas pelo componente
interface CourseIdProps {
  params: {
    courseId: string; // Identificador único do curso
  };
}

// Componente principal
const CoursePage: React.FC<CourseIdProps> = ({ params }) => {
  // Obtenção do usuário autenticado pelo Hook do Clerk
  const user = useUser();
  const router = useRouter();

  // Estados locais para controlar dados e carregamento
  const [course, setCourse] = useState<Courses | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [instructors, setInstructors] = useState<Instructors[] | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [isUserSubscribedInCourse, setIsUserSubscribedInCourse] = useState<boolean>(false);

  // Função para buscar os dados do curso
  const getCourse = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCourse(params.courseId);
      setCourse(data);
      setInstructors(data.instructors);
    } catch (error) {
      console.error("Erro ao buscar o curso:", error);
      toast.error("Erro ao carregar dados do curso.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para registrar o usuário no banco de dados
  const handleUserAuth = async () => {
    if (user.isSignedIn && user.user) {
      try {
        await fetchRegisterUser(user.user.id, user.user.fullName || "");
        setIsUserAuthenticated(true);
      } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        toast.error("Erro ao autenticar o usuário.");
        setIsUserAuthenticated(false);
      }
    } else {
      console.log("Usuário não autenticado ou dados de usuário ausentes.");
      setIsUserAuthenticated(false);
    }
  };

  // Função para inscrever o usuário no curso
  const handleSubscribeCourse = async () => {
    if (!user.user) {
      toast.error("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);
    try {
      toast.loading("Inscrevendo-se...");
      await fetchSubscribeCourse(params.courseId, user.user.id);
      setIsUserSubscribedInCourse(true);
      toast.success("Inscrição realizada com sucesso.");
    } catch (error) {
      console.error("Erro ao inscrever no curso:", error);
      toast.error("Erro ao realizar inscrição.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para verificar se o usuário está inscrito no curso
  const handleIsUserSubscribed = async () => {
    try {
      const isSubscribed = await fetchIsUserSubscribed(params.courseId);
      setIsUserSubscribedInCourse(isSubscribed);
    } catch (error) {
      // console.error("Erro ao verificar inscrição:", error);
      // toast.error("Erro ao verificar status de inscrição.");
    }
  };

  // Redireciona o usuário para a página do curso
  const handleRedirect = () => {
    toast.success("Iniciando o curso...");
    router.push(`/student/course/${params.courseId}`);
  };

  // Efeito para buscar dados do curso e verificar autenticação/inscrição
  useEffect(() => {
    getCourse();
    handleUserAuth();
    handleIsUserSubscribed();
  }, [params.courseId, user.isSignedIn]);

  return (
    <div className="w-full">
      <main className="min-h-screen mt-16 px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-48 py-8 flex justify-between flex-col md:flex-row space-y-4">
        {/* Informações do Curso */}
        <div className="md:w-2/3 md:px-4 space-y-4">
          {isLoading ? (
            <div className="space-y-2 mt-4">
              <Skeleton className="w-full h-24"></Skeleton>
              <div className="border-t border-gray-200 my-4"></div>
              <Skeleton className="w-full h-32"></Skeleton>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl font-bold mt-4">{course?.courseTitle}</h1>
              <div className="border-t border-gray-200 my-4"></div>
              <p>{course?.introduction}</p>
            </div>
          )}

          <div className="border-t border-gray-200 my-4"></div>

          {/* Botão de ação */}
          {isLoading ? (
            <Button className="w-32">
              <Spinner />
            </Button>
          ) : !isUserAuthenticated ? (
            <Button className="w-32" onClick={() => router.push("/sign-in")}>Login</Button>
          ) : !isUserSubscribedInCourse ? (
            <Button className="w-32" onClick={handleSubscribeCourse}>Inscrever-se</Button>
          ) : (
            <Button className="w-32" onClick={handleRedirect}>Iniciar</Button>
          )}

          <div className="border-t border-gray-200 my-4"></div>

          {/* Descrição do curso */}
          {isLoading ? (
            <Skeleton className="w-full h-60"></Skeleton>
          ) : (
            <div className="pt-8">{course?.description}</div>
          )}
        </div>

        {/* Card do Curso */}
        {course ? (
          <CourseCard
            courseId={course.id}
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

      {/* Seção de Instrutores */}
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
            Array(3).fill(null).map((_, idx) => <SkeletonInstructorCard key={idx} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

