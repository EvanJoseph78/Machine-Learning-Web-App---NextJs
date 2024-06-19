"use client"

import { Courses } from "@prisma/client";
import { CourseCard } from "./_components/course-card";
import { useEffect, useState } from "react";
import axios from "axios";

const CoursePage = (
  {
    params
  }: {
    params: { courseId: string }
  }
) => {

  const [course, setCourse] = useState<Courses>();

  const fetchCourses = async () => {
    // const response = await axios.get('/api/courses/');
    const response = await axios.get(`/api/courses/${params.courseId}`);
    setCourse(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchCourses();
  }, [params])

  return (
    <div className="w-full">

      <main className="h-full px-4 md:px-14 py-8 flex justify-between flex-col md:flex-row">
        <div>
          <h1 className="text-5xl text-bold">{course?.courseTitle}</h1>
          <p>{course?.introduction}</p>
        </div>

        {course && (
          <CourseCard
            courseId={course?.id}
            courseName={course.courseTitle}
            discipine={course.subject}
            linkCover={course.imageUrl}
            topics={course.tags}
            workload={course.duration}
            courseSubject={course.categoryId}
            difficulty={course.level}
            certificate={false}
          ></CourseCard>
        )}

      </main>

      <div className="w-full bg-dark-color text-white h-60">Professores</div>
    </div>
  );
};

export default CoursePage;

