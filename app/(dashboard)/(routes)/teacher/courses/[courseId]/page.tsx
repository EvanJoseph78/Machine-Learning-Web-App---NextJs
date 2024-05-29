"use client"

import { Course } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const CourseIdPage = ({
  params
}: {
  params: { courseId: string }
}) => {

  const url = `http://localhost:8080/api/courses/${params.courseId}`;

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);

  const { user } = useUser();

  const requiredFields = [
    course?.nome,
    course?.introducao,
    course?.descricao,
    course?.duracao,
    course?.disciplina,
    course?.nivel,
    course?.topicos,
    course?.certificado,
    course?.professores,
    course?.linkcapa,
    course?.modulos,
    course?.questoes
  ];

  const totalFields = requiredFields.length;
  const completedFieds = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFieds} / ${totalFields})`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false); // Você pode querer atualizar o estado de erro aqui também

        if (!course) {
          return redirect("/");
        }
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      {loading ? (
        <div>carregando...</div>
      ) : (
        <div>
          <div> CursoIdPage </div>
          {course?.nome}
          {user?.fullName}
        </div>
      )}

    </div>
  );

}
export default CourseIdPage;

