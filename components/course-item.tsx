
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { IconBadge } from "./icon-badge";
import { Skeleton } from "./ui/skeleton";

// Tipagem para o componente CourseItem
interface CourseItemProps {
  courseName: string;
  discipine: string | null;
  linkCover: string | null;
  tags: string[];
  courseId: string;
  courseDescription: string | null;
  courseLevel: string | null;
  editPage: boolean;
  category: string | null;
  totalAulas: number | 0;
}

/**
 * Componente que exibe as informações básicas de um curso.
 * 
 * @param {CourseItemProps} props As propriedades do componente.
 */
export const CourseItem = ({
  courseName,
  discipine,
  linkCover,
  tags,
  courseId,
  courseLevel,
  editPage,
  category,
  totalAulas,
}: CourseItemProps) => {

  const router = useRouter();

  // Função que redireciona para a página do curso
  const onRedirect = (uri: string) => {
    router.push(uri);
  };

  return (
    <div className="flex flex-col sm:w-[300px] min-h-[400px] rounded-xl overflow-hidden border p-2 relative">
      {/* Componente de imagem do curso */}
      <CourseImage linkCover={linkCover} courseId={courseId} />

      <div className="px-2 py-4 flex flex-col w-full gap-1">
        <h3
          className="font-bold text-md hover:text-vermelho-vinho transition duration-300 ease-in-out cursor-pointer"
          onClick={() => onRedirect(`/course/${courseId}`)}
        >
          {courseName}
        </h3>
        <h4 className="text-gray-800 text-xs">{category}</h4>

        <p className="text-xs text-gray-500">Nível: {courseLevel}</p>

        {/* Informação de aulas */}
        <div className="flex items-center gap-1">
          <IconBadge icon={BookOpen} size={"sm"} />
          <p className="text-xs">{totalAulas} Aulas</p>
        </div>

        {/* Exibindo tags */}
        <div className="flex flex-wrap mt-4 gap-1">
          {tags.map((tag, index) => (
            <p
              key={index}
              className="bg-vermelho-vinho text-white rounded-xl text-xs min-w-12 px-2 py-1"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>

      {/* Botão de edição (visível apenas na página de edição) */}
      {editPage && (
        <div className="absolute p-2 -right-2 bottom-0">
          <Button
            size={"sm"}
            onClick={() => {
              router.push(`/teacher/courses/${courseId}`);
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
const CourseImage = ({ linkCover, courseId }: { linkCover: string | null; courseId: string }) => {

  const router = useRouter();
  const defaultImage =
    "https://utfs.io/f/3815478c-2365-4578-871d-291daa3c5563-pzmzsy.jpg";

  return (
    <div
      className="bg-dark-color dark:bg-dark-color border min-h-[160px] flex justify-center items-center cursor-pointer rounded-xl overflow-hidden"
      onClick={() => { router.push(`/course/${courseId}`) }}
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
        <div className="flex items-center gap-1 gap-2">
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
