
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";

interface CourseItemProps {
  courseName: string,
  discipine: string | null,
  linkCover: string | null,
  tags: String[],
  courseId: string,
  courseDescription: string | null,
  courseLevel: string | null
  editPage: boolean,
}

export const CourseItem = ({ courseName, discipine, linkCover, tags, courseId, courseLevel, editPage }: CourseItemProps) => {

  const router = useRouter();

  const onRedirect = (courseId: string) => {
    router.push(`/course/${courseId}`)
  }

  return (
    <div className="flex flex-col w-[360px]  border rounded-xl overflow-hidden" >
      <div className="bg-dark-color dark:bg-dark-color border min-h-[200px] flex items-center cursor-pointer" onClick={() => onRedirect(courseId)}>

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
        <h3 className="font-bold text-xl hover:text-vermelho-vinho transition
    duration-300 ease-in-out cursor-pointer" onClick={() => onRedirect(courseId)}>{courseName}</h3>
        <h4 className="text-gray-800 text-xs">{discipine}</h4>

        <p className="text-md">Nível: {courseLevel}</p>

        <div className="flex flex-wrap mt-4 gap-1">
          {tags.map((tag, index) => (
            <p key={index} className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1 content-center items-center justify-center">{tag}</p>
          ))}
        </div>

      </div>

      {editPage && (
        <div className=" p-2 flex justify-end">
          {/* <Pencil /> */}
          <Button
            onClick={() => {
              router.push(`/teacher/courses/${courseId}`)
            }}
          >Editar</Button>
        </div>
      )}

    </div >

  );
};
