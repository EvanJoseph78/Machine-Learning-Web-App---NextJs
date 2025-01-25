"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { fetchGetCourses } from "@/services/api";
import { CourseWithTags } from "@/lib/types";
import { CourseItem, SkeletonCourseItem } from "./_components/course-item";

const Courses = () => {

  const [coursesList, setCoursesList] = useState<CourseWithTags[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCourses = async () => {
    const response = await fetchGetCourses();
    setCoursesList(response.courses);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      getCourses();
    } catch (error) {
    }
  }, []);

  return (
    <div className="h-full">
      <div className="w-full h-full px-2 sm:px-6 pt-16" >
        <h1 className="text-3xl font-bold">Cursos</h1>

        {/* TODO: CRIAÇÃO DE CURSOS */}
        {/* {true && ( */}
        {/*   <Link href={"/teacher/create"}> */}
        {/*     <Button > */}
        {/*       Novo Curso */}
        {/*     </Button> */}
        {/*   </Link> */}
        {/* )} */}

        <p className="text-xl font-bold text-gray-700 mt-8">Cursos disponíveis: {coursesList.length}</p>

        <div className="mt-4 h-full">
          <Tabs defaultValue="todos" className="w-full h-full">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="novos">Novos</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="sm:border sm:p-2 rounded-xl">
              {isLoading ? (
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 justify-center min-h-[300px]">
                    <SkeletonCourseItem></SkeletonCourseItem>
                    <SkeletonCourseItem></SkeletonCourseItem>
                    <SkeletonCourseItem></SkeletonCourseItem>
                    <SkeletonCourseItem></SkeletonCourseItem>
                    <SkeletonCourseItem></SkeletonCourseItem>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 justify-center min-h-[300px]">

                    {Array.isArray(coursesList) && coursesList.length > 0 ? (
                      coursesList.map((course) => (
                        <CourseItem key={course.id} course={course} />
                      ))
                    ) : (
                      <p>Nenhum curso disponível.</p>
                    )}
                  </div>
                </div>
              )}


            </TabsContent>

            <TabsContent value="novos">Em breve.</TabsContent>
          </Tabs>
        </div>

      </div>

    </div>
  );
}

export default Courses;
