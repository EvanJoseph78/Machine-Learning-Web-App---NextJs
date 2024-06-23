
import { IconBadge } from "@/components/icon-badge";
import VideoPlayer from "./video-player"
import { useEffect, useState } from "react";
import { EllipsisVertical, File } from "lucide-react";
import { useClassItem } from "@/components/providers/class-provider";

interface VideoDeailsProps {
  courseName: string,
  videoId: string,
  classNumber: number,
  className: string,
  teacher: string,
  courseId: string
  width: number
};

export const VideoDetail = ({
  courseName,
  videoId,
  classNumber,
  className,
  teacher,
  courseId,
  width
}: VideoDeailsProps) => {

  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number }>({ width: 880, height: 495 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const maxWidth = width; // Largura máxima do vídeo
      const aspectRatio = 16 / 9; // Proporção 16:9
      const newWidth = Math.min(screenWidth, maxWidth);
      const newHeight = newWidth / aspectRatio;
      setVideoDimensions({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { currentClassTitle, currentUrlClassVideo } = useClassItem();

  return (
    <div className="overflow-hidden">
      <VideoPlayer
        videoId={currentUrlClassVideo}
        height={videoDimensions.height} width={videoDimensions.width}
      ></VideoPlayer>

      <div className="mt-4 space-y-4 border rounded-md p-2">
        <div className="flex items-center justify-between">
          <p className="text-xl">{currentClassTitle}</p>
          <EllipsisVertical></EllipsisVertical>
        </div>
        <div className=" flex gap-2 items-center invisible">
          <File></File>
          <p className="text-xs">PDF aula </p>
        </div>
      </div>

    </div>
  )
}

