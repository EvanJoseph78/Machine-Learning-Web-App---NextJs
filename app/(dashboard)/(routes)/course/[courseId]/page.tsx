"use client"

import { Courses, Instructors } from "@prisma/client";
import { CourseCard } from "./_components/course-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { InstructorCard } from "./_components/instructores-card";

const CoursePage = (
  {
    params
  }: {
    params: { courseId: string }
  }
) => {

  const [course, setCourse] = useState<Courses>();
  const [instructors, setInstructors] = useState<Instructors[]>();

  const fetchCourses = async () => {
    // const response = await axios.get('/api/courses/');
    const response = await axios.get(`/api/courses/${params.courseId}`);
    console.log(response.data);
    setCourse(response.data);
    setInstructors(response.data.instructors)
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
            courseSubject={course.subject}
            difficulty={course.level}
            certificate={course.certificate}
          ></CourseCard>
        )}

      </main>

      <div className="w-full bg-dark-color text-white min-h-96 py-8">

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

