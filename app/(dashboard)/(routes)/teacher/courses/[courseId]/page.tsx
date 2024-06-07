"use client"

import { IconBadge } from "@/components/icon-badge";
import { Category, Course, Course1 } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";

const CourseIdPage = ({
  params
}: {
  params: { courseId: string }
}) => {

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const { user } = useUser();

  const requiredFields = [
    course?.courseTitle,
    course?.introduction,
    course?.description,
    course?.duration,
    course?.subject,
    course?.level,
    course?.tags,
    course?.certificate,
    course?.imageUrl,
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

  const fetchCourse = async (courseId: string) => {
    // const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
    // console.log(courseId);
    const response = await axios.get(`/api/courses/${courseId}`);

    return response.data;
  };

  const fetchCategories = async () => {
    const response = await axios.get('/api/categories/');
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await fetchCourse(params.courseId);
        const categoriesData = await fetchCategories();
        setCourse(courseData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Falha ao carrgar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.courseId]);

  if (!loading && !course) {
    console.log(!loading);
    console.log(!course);
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
                />

                <CategoryForm
                  initialData={course}
                  courseId={params.courseId}
                  options={
                    categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))
                  }
                />

              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} size={"sm"}
                  ></IconBadge>

                  <h2 className="text-xl">
                    Módulos do curso
                  </h2>
                </div>

                <div>
                  TODO: Aulas
                </div>

                <div className="">

                  <div className="flex items-center gap-x-2 ">
                    <IconBadge icon={File} size={"sm"}></IconBadge>
                    <h2 className="text-xl">
                      Resourses e attachments
                    </h2>
                  </div>

                  {/* <AttachmentForm */}
                  {/*   initialData={course} */}
                  {/*   courseId={params.courseId} */}
                  {/* /> */}

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );

}
export default CourseIdPage;

