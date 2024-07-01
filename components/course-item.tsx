
import { useRouter } from "next/navigation";

import Image from "next/image";
import { BookOpen, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { IconBadge } from "./icon-badge";
import { Skeleton } from "./ui/skeleton";

interface CourseItemProps {
  courseName: string,
  discipine: string | null,
  linkCover: string | null,
  tags: String[],
  courseId: string,
  courseDescription: string | null,
  courseLevel: string | null
  editPage: boolean,
  category: string | null,
}

export const CourseItem = ({ courseName, discipine, linkCover, tags, courseId, courseLevel, editPage, category }: CourseItemProps) => {

  const router = useRouter();

  const onRedirect = (courseId: string) => {
    router.push(`/course/${courseId}`)
  }

  return (
    <div className="flex flex-col  sm:w-[300px] min-h-[400px] rounded-xl overflow-hidden border p-2 relative" >
      <div className="bg-dark-color dark:bg-dark-color border min-h-[160px] flex items-center cursor-pointer rounded-xl overflow-hidden" onClick={() => onRedirect(courseId)}>

        {linkCover ? (
          <Image
            height={300}
            width={360}
            alt="logo"
            src={linkCover}
          />

        ) : (
          <Image
            height={300}
            width={360}
            alt="logo"
            src={"https://utfs.io/f/3815478c-2365-4578-871d-291daa3c5563-pzmzsy.jpg"}
          />
        )
        }
      </div>

      <div className="px-2 py-4 flex flex-col w-full gap-1">
        <h3 className="font-bold text-md hover:text-vermelho-vinho transition
    duration-300 ease-in-out cursor-pointer" onClick={() => onRedirect(courseId)}>{courseName}</h3>
        <h4 className="text-gray-800 text-xs">{category}</h4>

        <p className="text-xs text-gray-500">Nível: {courseLevel}</p>
        <div className="flex items-center gap-1">
          <IconBadge icon={BookOpen} size={"sm"}></IconBadge>
          {/* TODO:  arrumar a quantidade de aulas*/}
          <p className="text-xs">32 Aulas</p>
        </div>

        <div className="flex flex-wrap mt-4 gap-1">
          {tags.map((tag, index) => (
            <p key={index} className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1 content-center items-center justify-center">{tag}</p>
          ))}
        </div>

      </div>

      {editPage && (
        <div className="absolute p-2 -right-2 bottom-0">
          {/* <Pencil /> */}
          <Button
            size={"sm"}
            onClick={() => {
              router.push(`/teacher/courses/${courseId}`)
            }}
          >Editar</Button>
        </div>
      )}

    </div >

  );
};

export const SkeletonCourseItem = () => {
  return (
    <div className="flex flex-col  sm:w-[300px] min-h-[400px] rounded-xl overflow-hidden border p-2 relative" >
      <div className="bg-dark-color dark:bg-dark-color border min-h-[160px] flex items-center cursor-pointer rounded-xl overflow-hidden" >
        <Skeleton className="w-[360px] h-[160px]" />
      </div>


      <div className="px-2 py-4 flex flex-col w-full gap-1">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-12 h-4" />

        <div className="text-xs text-gray-500 flex gap-2">
          Nível:
          <Skeleton className="w-8 h-4" />
        </div>
        <div className="flex items-center gap-1 gap-2">
          <IconBadge icon={BookOpen} size={"sm"}></IconBadge>
          {/* TODO:  arrumar a quantidade de aulas*/}
          <Skeleton className="w-8 h-4" />
        </div>

        <div className="flex flex-wrap mt-4 gap-1">
          <Skeleton className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1 content-center items-center justify-center h-4" />
          <Skeleton className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-8 px-2 py-1 content-center items-center justify-center h-4" />
          <Skeleton className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-10 px-2 py-1 content-center items-center justify-center h-4" />
        </div>

      </div>

    </div >
  )
}
