import { useRouter } from "next/navigation";

import Image from "next/image";
import { CourseWithTags } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseItemProps {
  course: CourseWithTags;
}

export const CourseItem = ({ course }: CourseItemProps) => {

  const router = useRouter();

  const onRedirect = (slug: string, courseId: string) => {
    // Remove acentos e caracteres especiais
    const formattedSlug = slug
      .normalize("NFD") // Decompõe caracteres acentuados, como "á" em "a" + acento
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
      .trim() // Remove espaços extras
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .toLowerCase(); // Converte para letras minúsculas

    // Redireciona para a URL com o slug formatado e o ID do curso
    router.push(`course/${formattedSlug}-${courseId}`);
  };

  return (
    <div className="flex flex-col sm:w-[300px] min-h-[400px] rounded-xl overflow-hidden border p-2 relative">
      {/* Componente de imagem do curso */}
      <CourseImage linkCover={course.coverImageUrl} courseId={course.id} courseName={course.title} />

      <div className="px-2 py-4 flex flex-col w-full gap-1">
        <h3
          className="font-bold text-md hover:text-vermelho-vinho transition duration-300 ease-in-out cursor-pointer"
          onClick={() => onRedirect(course.title, course.id)}
        >
          {course.title}
        </h3>
        <h4 className="text-gray-800 text-xs">{"science"}</h4>

        <p className="text-xs text-gray-500">Nível: {course.level}</p>

        {/* Informação de aulas */}
        <div className="flex items-center gap-1">
          <IconBadge icon={BookOpen} size={"sm"} />
          <p className="text-xs">{20} Aulas</p>
        </div>

        {/* Exibindo tags */}
        <div className="flex flex-wrap mt-4 gap-1">
          {course.Tag.map((tag, index) => (
            <p
              key={index}
              className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1"
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>

      {/* Botão de edição (visível apenas na página de edição) */}
      {true && (
        <div className="absolute p-2 -right-2 bottom-0">
          <Button
            size={"sm"}
            onClick={() => {
              router.push(`/teacher/courses/${course.id}`);
            }}
          >
            Editar
          </Button>
        </div>
      )}
    </div>
  );
};


/**
 * Componente auxiliar que renderiza a imagem de capa do curso.
 * Se a imagem não estiver disponível, exibe uma imagem padrão.
 * 
 * @param {Object} props As propriedades do componente.
 * @param {string | null} props.linkCover O link da imagem de capa do curso.
 * @param {string} props.courseId O ID do curso.
 */
const CourseImage = (
  { linkCover, courseId, courseName }: { linkCover: string | null; courseId: string; courseName: string }) => {

  const router = useRouter();
  const defaultImage =
    "https://utfs.io/f/3815478c-2365-4578-871d-291daa3c5563-pzmzsy.jpg";

  const onRedirect = (slug: string, courseId: string) => {
    // Remove acentos e caracteres especiais
    const formattedSlug = slug
      .normalize("NFD") // Decompõe caracteres acentuados, como "á" em "a" + acento
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
      .trim() // Remove espaços extras
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .toLowerCase(); // Converte para letras minúsculas

    // Redireciona para a URL com o slug formatado e o ID do curso
    router.push(`course/${formattedSlug}-${courseId}`);
  };

  return (
    <div
      className="bg-dark-color dark:bg-dark-color border min-h-[160px] flex justify-center items-center cursor-pointer rounded-xl overflow-hidden"
      onClick={() => { onRedirect(courseName, courseId) }}
    >
      <Image
        height={300}
        width={360}
        alt="logo"
        src={linkCover ?? defaultImage}
      />
    </div>
  );
};


/**
 * Componente de Skeleton (placeholder) para o CourseItem, utilizado enquanto os dados reais são carregados.
 */
export const SkeletonCourseItem = () => {
  return (
    <div className="flex flex-col sm:w-[300px] min-h-[400px] rounded-xl overflow-hidden border p-2 relative">
      {/* Skeleton para a imagem */}
      <div className="bg-dark-color dark:bg-dark-color border min-h-[160px] flex items-center cursor-pointer rounded-xl overflow-hidden">
        <Skeleton className="w-[360px] h-[160px]" />
      </div>

      <div className="px-2 py-4 flex flex-col w-full gap-1">
        {/* Skeleton para título e categoria */}
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-12 h-4" />

        {/* Skeleton para o nível */}
        <div className="text-xs text-gray-500 flex gap-2">
          Nível:
          <Skeleton className="w-8 h-4" />
        </div>

        {/* Skeleton para as aulas */}
        <div className="flex items-center gap-2">
          <IconBadge icon={BookOpen} size={"sm"} />
          <Skeleton className="w-8 h-4" />
        </div>

        {/* Skeleton para as tags */}
        <div className="flex flex-wrap mt-4 gap-1">
          <Skeleton className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1 h-4" />
          <Skeleton className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-8 px-2 py-1 h-4" />
          <Skeleton className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-10 px-2 py-1 h-4" />
        </div>
      </div>
    </div>
  );
};
