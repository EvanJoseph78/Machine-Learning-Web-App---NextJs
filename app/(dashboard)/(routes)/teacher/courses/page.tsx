import { CoursesList } from "@/components/course-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursePage = () => {
  return (
    <div className="p-6">
      <Link href={"/teacher/create"}>
        <Button >
          Novo Curso
        </Button>
      </Link>
      <CoursesList editPage={true}></CoursesList>
    </div>
  );
};

export default CoursePage;
