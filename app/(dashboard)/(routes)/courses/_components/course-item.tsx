
import { Tags } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CourseItemProps {
  courseName: string,
  discipine: string | null,
  linkCover: string | null,
  tags: Tags[],
  courseId: string,
}

export const CourseItem = ({ courseName, discipine, linkCover, tags, courseId }: CourseItemProps) => {

  const router = useRouter();

  const onRedirect = (courseId: string) => {
    router.push(`/course/${courseId}`)
  }

  return (

    <div className="flex flex-col w-[360px] cursor-pointer" onClick={() => onRedirect(courseId)}>

      {linkCover ? (
        <img
          src={linkCover}
          alt="Logo cover"
          height="300"
          width="360"
        ></img>

      ) : (
        <img
          src={"https://utfs.io/f/3815478c-2365-4578-871d-291daa3c5563-pzmzsy.jpg"}
          alt="Logo cover"
          height="300"
          width="360"
        ></img>
      )}

      <div className="px-2 py-4">
        <h3 className="font-bold text-md">{courseName}</h3>
        <h4 className="text-gray-800 text-xs">{discipine}</h4>

        <div className="flex flex-wrap mt-4 gap-1">
          {/* {tags.map((topico) => ( */}
          {/*   <p key={topico} className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1 content-center items-center justify-center">{topico}</p> */}
          {/* ))} */}
        </div>
      </div>

    </div>

  );
};
