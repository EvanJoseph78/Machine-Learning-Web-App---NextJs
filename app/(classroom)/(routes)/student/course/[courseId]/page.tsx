"use client"

import { SideBar } from "@/app/(classroom)/_components/sidebar";
import VideoPlayer from "@/app/(classroom)/_components/video-player";
import { NavbarRoutes } from "@/components/navbar-routes";
import { useClassItem } from "@/components/providers/class-provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useCourseData from "@/hooks/useCourse";
import { useEffect, useState } from "react";
import { EllipsisVertical, File } from 'lucide-react';

const ClassRoom = (
  { params }: {
    params: { courseId: string }
  }
) => {

  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number }>({ width: 1000, height: 562 });

  const { currentClassTitle, currentClassNumber } = useClassItem();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const maxWidth = 1000; // Largura máxima do vídeo
      const aspectRatio = 16 / 9; // Proporção 16:9
      const newWidth = Math.min(screenWidth, maxWidth);
      const newHeight = newWidth / aspectRatio;
      setVideoDimensions({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { course, isLoading } = useCourseData(params.courseId);

  const { currentUrlClassVideo } = useClassItem();

  return (
    <div className="h-full flex flex-col content-center xl:flex-row">

      <div className="md:h-full xl:w-4/5 h-screen overflow-y-scroll">

        <div className="">
          <div className="p-4 border-b h-full flex items-center shadow-sm">
            <NavbarRoutes isclassroom courseName={course?.courseTitle} courseId={params.courseId}></NavbarRoutes>
          </div>
        </div>

        <div className="py-2">
          {isLoading ? (
            <div className="w-full bg-vermelho-vinho p-4 flex flex-col justify-center content-center items-center">
              <AspectRatio ratio={16 / 9}>
                carregando...
              </AspectRatio>
            </div>

          ) : (
            <div className="w-full flex flex-col justify-center content-center items-center">
              <div className="w-full sticky top-0 md:relative dark:bg-dark-color ">
                <AspectRatio ratio={16 / 9} >
                  <VideoPlayer
                    videoId={currentUrlClassVideo}
                    height={videoDimensions.height}
                    width={videoDimensions.width}
                    courseId={params.courseId}
                  />
                </AspectRatio>
              </div>

              <div className="mt-4 space-y-4 border rounded-md p-2 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-xl">{currentClassNumber} - {currentClassTitle}</p>
                  <EllipsisVertical />
                </div>
                <div className="flex gap-2 items-center invisible">
                  <File />
                  <p className="text-xs">PDF aula</p>
                </div>
              </div>

              <div className="w-full xl:hidden block xl:w-2/5">
                <SideBar courseId={params.courseId} />
              </div>

            </div>
          )}
        </div>
      </div>

      <div className="hidden xl:block xl:w-2/5">
        <SideBar courseId={params.courseId} />
      </div>
    </div>
  );
};

export default ClassRoom;
