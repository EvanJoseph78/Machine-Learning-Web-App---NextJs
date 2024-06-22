
import { Award, BarChart, BookOpen, Calendar, List } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  courseId: string,
  courseName: string,
  discipine: string | null,
  linkCover: string | null,
  topics: string[],
  workload: number | null,
  courseSubject: string | null,
  difficulty: string | null,
  certificate: boolean | null,
}


export const CourseCard = ({ courseName, discipine, linkCover, topics, courseId, workload, courseSubject, difficulty, certificate }: CourseCardProps) => {

  return (

    <div className="rounded-xl overflow-hidden border md:w-[500px] w-full">
      <img src="https://i.imgur.com/bYHLC9J.png" alt="" />

      <div className="px-4 py-8">

        <div className="flex  justify-between border-b border-b-grey-800 py-4">
          <span className="flex items-center content-center gap-2"><Calendar />Carga horária</span>
          <span>{workload} horas</span>
        </div>

        <div className="flex  justify-between border-b border-b-grey-800 py-4">
          <span className="flex items-center content-center gap-2"><BookOpen />Disciplina</span>
          <span>{courseSubject}</span>
        </div>

        <div className="flex  justify-between border-b border-b-grey-800 py-4">
          <span className="flex items-center content-center gap-2"><BarChart />Dificuldade</span>
          <span>{difficulty}</span>
        </div>

        <div className="flex  justify-between border-b border-b-grey-800 py-4">
          <span className="flex items-center content-center gap-2"><Award />Certificado</span>
          {certificate ? (
            <span>Sim</span>
          ) : (
            <span>Não</span>
          )}
        </div>

        <div className="flex justify-between border-b border-b-grey-800 py-4">
          <span className="flex items-center content-center gap-2"><List />Tópicos abordados</span>
          <div className="flex flex-wrap w-1/2 justify-end gap-1">
            {topics?.map((topico) => (
              <p key={topico} className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1 content-center items-center justify-center">{topico}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center content-center justify-center mt-32">
          <Image
            src={"/icons/logo-facomp-preta.png"}
            alt={"Logo Facomp"}
            width={80}
            height={80}
          />
          <p>FACOMP</p>
        </div>

      </div>

    </div>

  );
};

