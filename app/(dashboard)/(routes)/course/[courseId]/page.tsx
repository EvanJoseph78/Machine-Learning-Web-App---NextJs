"use client"

import { Courses, Instructors } from "@prisma/client";
import { CourseCard } from "./_components/course-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { InstructorCard } from "./_components/instructores-card";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CoursePage = (
  {
    params
  }: {
    params: { courseId: string }
  }
) => {

  const [course, setCourse] = useState<Courses>();
  const [instructors, setInstructors] = useState<Instructors[]>();
  const user = useUser();
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // salva o usuário no banco de dados
  const handleRegister = async () => {
    if (user) {
      try {
        const response = await axios.post('/api/register', {
          userId: user.user?.id,
          fullName: user.user?.fullName
        })

      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
      }
    } else {
      console.log('Usuário não está definido.');
    }
  };

  // verifica se o usuário tá inscrito no curso
  const isUserSubscribedInCourse = async () => {
    try {
      const response = await axios.get(`/api/courses/${params.courseId}/subscribe`);

      if (response.status == 200) {
        setIsUserSubscribed(true);
      } else {
        setIsUserSubscribed(false);
      }
      console.log(response.status);


    } catch (error) {
      console.error('erro', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Inscreve o usuário no curso
  const handleSubscribeCourse = async () => {
    try {
      const response = await axios.post(`/api/courses/${params.courseId}/subscribe`, {
        userId: user.user?.id,
      })
      if (response.data === "usuário não cadastrado") {
        await handleRegister();
        await handleSubscribeCourse();  // Tente novamente após o registro
      } else {
        console.log('Inscrição bem-sucedida:', response.data);

        toast.success("Inscrito no curso com sucesso!");
        setIsUserSubscribed(true);
      }
    } catch (error) {
      console.error('Erro ao inscrever-se no curso');
    }
  }

  const handleRedirect = () => {
    router.push(`/student/course/${params.courseId}`);
  }

  // busca o curso pelo id
  const fetchCourses = async () => {
    // const response = await axios.get('/api/courses/');
    const response = await axios.get(`/api/courses/${params.courseId}`);
    setCourse(response.data);
    setInstructors(response.data.instructors)
    return response.data;
  };

  useEffect(() => {
    fetchCourses();
    isUserSubscribedInCourse();
  }, [])

  const router = useRouter();

  return (
    <div className="w-full">

      <main className="h-full mt-16 px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-48 py-8 flex justify-between flex-col md:flex-row">
        <div className="md:w-2/3 px-4 space-y-4">
          <h1 className="text-5xl text-bold">{course?.courseTitle}</h1>
          <p>{course?.introduction}</p>

          {isLoading && (
            <Button disabled>Carregando...</Button>
          )}

          {user.isSignedIn && !isUserSubscribed && !isLoading && (
            <Button onClick={handleSubscribeCourse}>Inscrever-se</Button>
          )}

          {user.isSignedIn && isUserSubscribed && !isLoading && (
            <Button onClick={handleRedirect}>Iniciar</Button>
          )}

          {!user.isSignedIn && !isLoading && (
            <Button onClick={() => { router.push("/sign-in") }}>Entrar</Button>
          )}


        </div>

        {course && (
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
          ></CourseCard>
        )}

      </main>

      <div className="w-full bg-dark-color text-white min-h-96 py-8 border-y ">

        <h1 className="text-5xl text-center">Instrutores</h1>

        <div className="flex mt-8 gap-32 flex-wrap justify-center">
          {instructors?.map((instructor) => (
            <InstructorCard
              instructorName={instructor.name}
              formation1={instructor.formation1}
              formation2={instructor.formation2}
              profilePictureUrl={instructor.profileUrl}
              key={instructor.id} />
          ))}
        </div>

      </div>

      <div className="bg-black h-60">Footer</div>
    </div>
  );
};

export default CoursePage;

