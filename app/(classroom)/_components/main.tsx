import { Courses } from "@prisma/client";
import { VideoDetail } from "./video-detail";

interface MainProps {
  course: Courses;
}

export const Main = ({ course }: MainProps) => {

  return (
    <div className="p-4 flex flex-col justify-center content-center items-center ">

      <div className="block 2xl:hidden">
        <VideoDetail
          courseName={""}
          videoId={"O8JwentM350"}
          classNumber={0}
          className={""}
          teacher={""}
          courseId={""}
          width={850}
        ></VideoDetail>
      </div>

      <div className="hidden 2xl:block">
        <VideoDetail
          courseName={""}
          videoId={"O8JwentM350"}
          classNumber={0}
          className={""}
          teacher={""}
          courseId={""}
          width={1000}
        ></VideoDetail>
      </div>


    </div>
  );
};
