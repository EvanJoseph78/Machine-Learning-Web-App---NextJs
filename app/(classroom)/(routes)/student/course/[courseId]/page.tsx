"use client"

import { SideBar } from "@/app/(classroom)/_components/sidebar";
import VideoPlayer from "@/app/(classroom)/_components/video-player";
import { NavbarRoutes } from "@/components/navbar-routes";
import { useClassItem } from "@/components/providers/class-provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useCourseData from "@/hooks/useCourse";
import { useEffect, useState } from "react";
import { EllipsisVertical, File, Play } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { fetchGetLastClass } from "@/services/api";

const ClassRoom = (
  { params }: {
    params: { courseId: string }
  }
) => {

  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number }>({ width: 1000, height: 562 });

  const { currentClassTitle, currentClassNumber } = useClassItem();
  const { listClasses } = useCourseData(params.courseId);

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
    handleLastClass();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { course, isLoading } = useCourseData(params.courseId);

  const {
    currentUrlClassVideo,
    setCurrentIdClass,
    setCurrentClassTitle,
    setCurrentUrlClassVideo,
    setCurrentClassNumber,
    setCurrentModuleId
  } = useClassItem();

  const handleLastClass = () => {
    // Atualiza o estado com base em listClasses, se disponível
    if (listClasses && listClasses.length > 0 && listClasses[0].classes.length > 0) {
      const { id, videoUrl, classTitle, classNumber, modulesId } = listClasses[0].classes[0];
      setCurrentIdClass(id);
      setCurrentUrlClassVideo(videoUrl!);
      setCurrentClassTitle(classTitle!);
      setCurrentClassNumber(String(classNumber));
      setCurrentModuleId(modulesId!);
      console.log(videoUrl!);
    }
    // Atualiza o estado com base na resposta da API
    fetchGetLastClass(params.courseId).then((data) => {
      setCurrentIdClass(data.class.id);
      setCurrentUrlClassVideo(data.class.videoUrl);
      setCurrentClassTitle(data.class.classTitle);
      setCurrentClassNumber(data.class.classNumber);
      setCurrentModuleId(data.lastModuleId);
      console.log(data);
    }).catch((err) => {
      console.error('Erro ao buscar a última aula:', err);
    });
  }

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
            <div className="w-full p-4 flex flex-col justify-center content-center items-center">
              <AspectRatio ratio={16 / 9}>
                <Skeleton className="w-full h-full"></Skeleton>
              </AspectRatio>
            </div>

          ) : (
            <div className="w-full flex flex-col justify-center content-center items-center">
              <div className="w-full sticky top-0 md:relative dark:bg-dark-color ">
                <AspectRatio ratio={16 / 9} >
                  {currentUrlClassVideo == "" ? (
                    <AspectRatio ratio={16 / 9} className="flex items-center justify-center content-center">
                      <div
                        // TODO: arrumar caso a primeira aula seja vazia
                        onClick={handleLastClass}
                        className="border rounded-full p-4 shadow-sm cursor-pointer"
                      >
                        <Play className="h-12 w-12 hover:h-16 hover:w-16 transition duration-300 ease-in-out"></Play>
                      </div>
                    </AspectRatio>
                  ) : (
                    <VideoPlayer
                      videoId={currentUrlClassVideo}
                      height={videoDimensions.height}
                      width={videoDimensions.width}
                      courseId={params.courseId}
                    />
                  )}
                </AspectRatio>
              </div>
            </div>
          )}

          <div className="space-y-4 w-full px-2 py-4 xl:px-4">
            <div className="border px-2 py-1 rounded-md">
              <div className="flex items-center justify-between">
                {isLoading ? (
                  <div className="flex gap-2">
                    <Skeleton className="w-8 h-6"></Skeleton>
                    <Skeleton className="w-96 h-6"></Skeleton>
                  </div>
                ) : (
                  <p className="text-xl">{currentClassNumber} - {currentClassTitle}</p>
                )}
                <EllipsisVertical />
              </div>
              <div className="hidden gap-2 items-center ">
                <File />
                <p className="text-xs">PDF aula</p>
              </div>
            </div>

          </div>
        </div>

        <div className="w-full xl:hidden block xl:w-2/5">
          <SideBar courseId={params.courseId} />
        </div>

      </div>

      <div className="hidden xl:block xl:w-2/5">
        <SideBar courseId={params.courseId} />
      </div>
    </div>
  );
};

export default ClassRoom;
