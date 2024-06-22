"use client"

import { Main } from "@/app/(classroom)/_components/main";
import { SideBar } from "@/app/(classroom)/_components/sidebar";
import { ListClassesContext } from "@/components/providers/classes-list-provider";
import useCourseData from "@/hooks/useCourse";
import { ListClasses } from "@/lib/types";
import { Courses } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const ClassRoom = (
  { params }: {
    params: { courseId: string }
  }
) => {

  const { course, listClasses, setListClasses, isLoading, error } = useCourseData(params.courseId);

  return (
    <ListClassesContext.Provider value={{ listClasses, setListClasses }}>
      <div className="h-full">

        <div className="h-full">

          {isLoading ? (
            <div>carregando...</div>
          ) : (
            <Main course={course!}></Main>
          )}

        </div>

        <div className="hidden xl:flex w-1/3 flex-col md:fixed right-0 inset-y-0 z-50">
          <SideBar />
        </div>

        <div className="flex md:hidden flex-col">
          <SideBar />
        </div>

      </div>
    </ListClassesContext.Provider>
  );
};

export default ClassRoom;
