"use client"

import { SideBar } from "@/app/(classroom)/_components/sidebar";
import { VideoDetail } from "@/app/(classroom)/_components/video-detail";
import { NavbarRoutes } from "@/components/navbar-routes";
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
          <div className="p-4 border-b h-full flex items-center shadow-sm">
            <NavbarRoutes isclassroom courseName={course?.courseTitle} courseId={params.courseId}></NavbarRoutes>
          </div>

        </div>

        {isLoading ? (
          <div>carregando...</div>
        ) : (
          <div className="p-4 flex flex-col justify-center content-center items-center ">
            <VideoDetail width={1000} ></VideoDetail>
          </div>
        )}

      </div>

      <div className="xl:w-2/5">
        <SideBar courseId={params.courseId} />
      </div>

    </div>
  );
};

export default ClassRoom;
