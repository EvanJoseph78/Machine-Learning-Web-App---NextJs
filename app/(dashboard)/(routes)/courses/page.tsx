"use client"

import { CoursesList } from "@/components/course-list";

const CoursesListPage = () => {

  return (
    <div className="min-h-screen">
      <CoursesList editPage={false}></CoursesList>
    </div>
  );
};

export default CoursesListPage;
