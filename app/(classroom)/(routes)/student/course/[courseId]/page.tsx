"use client"

import { Main } from "@/app/(classroom)/_components/main";
import { Navbar } from "@/app/(classroom)/_components/navbar";
import { SideBar } from "@/app/(classroom)/_components/sidebar";
import { ListClassesContext } from "@/components/providers/classes-list-provider";
import useCourseData from "@/hooks/useCourse";

const ClassRoom = (
  { params }: {
    params: { courseId: string }
  }
) => {

  const { course, listClasses, setListClasses, isLoading, error } = useCourseData(params.courseId);

  return (
    <ListClassesContext.Provider value={{ listClasses, setListClasses }}>
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
          <SideBar />
        </div>

      </div>
    </ListClassesContext.Provider>
  );
};

export default ClassRoom;
