"use client"

import { Main } from "@/app/(classroom)/_components/main";
import { Navbar } from "@/app/(classroom)/_components/navbar";
import { SideBar } from "@/app/(classroom)/_components/sidebar";
import useCourseData from "@/hooks/useCourse";

const ClassRoom = (
  { params }: {
    params: { courseId: string }
  }
) => {

  const { course, listClasses, setListClasses, isLoading, error } = useCourseData(params.courseId);

  return (
    <div className="h-full flex flex-col content-center xl:flex-row">

      <div className="h-full xl:w-4/5 ">

        <div className="">
          <Navbar></Navbar>
        </div>

        {isLoading ? (
          <div>carregando...</div>
        ) : (
          <Main course={course!}></Main>
        )}

      </div>

      <div className="xl:w-2/5">
        <SideBar courseId={params.courseId} />
      </div>

    </div>
  );
};

export default ClassRoom;
