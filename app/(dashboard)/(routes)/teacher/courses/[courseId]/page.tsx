"use client"

import { IconBadge } from "@/components/icon-badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";

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

  const isValidField = (field: any): boolean =>
    field !== undefined &&
    field !== null &&
    (typeof field !== 'string' || field.trim() !== '') &&
    (!Array.isArray(field) || field.length > 0);

  const completedFields = requiredFields.filter(isValidField).length;
  const completionText = `(${completedFields}/${totalFields})`;

  // const completionText = `(${completedFieds}/${totalFields})`


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false); // Você pode querer atualizar o estado de erro aqui também
      }
    };

    fetchData();
  }, [url]);

  if (!loading && !course) {
    if (!course || !user) {
      return redirect("/");
    }
  }

  return (
    <div className="p-6">
      {loading ? (
        <div>carregando...</div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2 w-full">
            <h1 className="text-2xl font-semibold">Edição do Curso</h1>
            <span className="text-sm text-dark-color">Preencha todos os campos {completionText}</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} size={"sm"} variant={"success"} />
                  <h2 className="text-xl">
                    Customizar o curso
                  </h2>
                </div>
                {/* <Button onClick={() => { console.log(requiredFields); }}>Btn</Button> */}
                {/* {course?.nome} */}

                <TitleForm
                  initialData={course}
                  courseId={params.courseId}
                ></TitleForm>

                <DescriptionForm
                  initialData={course}
                  courseId={params.courseId}
                ></DescriptionForm>

                <ImageForm
                  initialData={course}
                  courseId={params.courseId}
                ></ImageForm>

              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );

}
export default CourseIdPage;

