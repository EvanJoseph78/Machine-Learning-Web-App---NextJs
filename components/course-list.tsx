"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Courses } from "@prisma/client";
import { useEffect, useState } from "react";
import { CourseItem, SkeletonCourseItem } from "./course-item";
import Link from "next/link";
import { Button } from "./ui/button";

import { fetchCourses } from "@/services/api";
import { Skeleton } from "./ui/skeleton";

interface CourseListProps {
  editPage: boolean
}

export const CoursesList = ({ editPage = false }: CourseListProps) => {

  const [coursesList, setCoursesList] = useState<Courses[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setCoursesList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar cursos:', error);
      });
  }, []);

  return (
    <div className="w-full h-full px-2 sm:px-6 pt-16" >
      <h1 className="text-3xl font-bold">Cursos</h1>

      {editPage && (
        <Link href={"/teacher/create"}>
          <Button >
            Novo Curso
          </Button>
        </Link>
      )}

      <p className="text-xl font-bold text-gray-700 mt-8">Cursos disponíveis: 2</p>

      <div className="mt-4 h-full">
        <Tabs defaultValue="todos" className="w-full h-full">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="novos">Novos</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="sm:border sm:p-2 rounded-xl">
            {isLoading ? (
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-center min-h-[300px]">
                  <SkeletonCourseItem></SkeletonCourseItem>
                  <SkeletonCourseItem></SkeletonCourseItem>
                  <SkeletonCourseItem></SkeletonCourseItem>
                  <SkeletonCourseItem></SkeletonCourseItem>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-center min-h-[300px]">
                  {coursesList.map((course) => (
                    <CourseItem
                      key={course.id}
                      courseName={course.courseTitle}
                      discipine={course.subject}
                      linkCover={course.imageUrl}
                      tags={course.tags}
                      courseId={course.id}
                      courseDescription={course.description}
                      courseLevel={course.level}
                      editPage={editPage}
                      category={course.subject}
                    ></CourseItem>
                  ))}
                </div>
              </div>
            )}


          </TabsContent>

          <TabsContent value="novos">Em breve.</TabsContent>
        </Tabs>
      </div>

    </div>

  );
};

