"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Courses } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourseItem } from "./course-item";
import Link from "next/link";
import { Button } from "./ui/button";

import { fetchCourses } from "@/services/api";

interface CourseListProps {
  editPage: boolean
}

export const CoursesList = ({ editPage = false }: CourseListProps) => {

  const [coursesList, setCoursesList] = useState<Courses[]>([]);

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setCoursesList(data);
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

            <div className="flex justify-center flex-wrap content-center items-center gap-2 min-h-[360px] ">
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


          </TabsContent>

          <TabsContent value="novos">Em breve.</TabsContent>
        </Tabs>
      </div>

    </div>

  );
};

