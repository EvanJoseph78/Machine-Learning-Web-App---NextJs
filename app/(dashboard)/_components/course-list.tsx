"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Courses } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export const CourseListpage = () => {

  const [coursesList, setCoursesList] = useState<Courses[]>([]);

  const fetchCourses = async () => {
    const response = await axios.get('/api/courses/');
    setCoursesList(response.data);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    try {
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <div className="w-full h-full px-4 pt-16" >
      <h1 className="text-3xl font-bold">Cursos de Desenvolvimento</h1>
      <p className="text-xl font-bold text-gray-700 mt-8">Cursos disponíveis: 2</p>

      <div className="mt-4">
        <Tabs defaultValue="todos" className="w-full">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="novos">Novos</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="border p-2 rounded-xl">

            {/* <div className="flex justify-center flex-wrap content-center items-center gap-2"> */}
            {/*   {courses.map((course) => ( */}
            {/*     <CourseCard key={course._id} courseId={course._id} courseName={course.nome} discipine={course.disciplina} linkCover={course.linkcapa} topics={course.topicos} /> */}
            {/*   ))} */}
            {/* </div> */}

            <div className="flex justify-center flex-wrap content-center items-center gap-2 flex-col">
              {coursesList.map((course) => (
                <div key={course.id}>{course.courseTitle}</div>
              ))}
            </div>


          </TabsContent>

          <TabsContent value="novos">Em breve.</TabsContent>
        </Tabs>
      </div>

    </div>

  );
};

