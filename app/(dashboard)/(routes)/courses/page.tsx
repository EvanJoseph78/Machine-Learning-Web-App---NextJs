"use client"

import { CoursesList } from "@/components/course-list";

const CoursesListPage = () => {

  return (
    <div>
      <CoursesList editPage={false}></CoursesList>
    </div>
  );
};

export default CoursesListPage;
