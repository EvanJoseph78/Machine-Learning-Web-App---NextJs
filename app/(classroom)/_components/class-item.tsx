import { EllipsisVertical, File, FileText, Monitor } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useClassItem } from "@/components/providers/class-provider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ClassItemProps {
  classId: string | null,
  classTitle: string | null,
  classNumber?: number,
  videoUrl?: string | null,
  pdfLink?: string,
  slideLink?: string,
  onClick?: () => void
}

export const ClassItem = ({ pdfLink = "", slideLink = "", classTitle, classNumber, onClick, videoUrl, classId }: ClassItemProps) => {
  let hasSlide = false;
  let hasPdf = false;

  if (pdfLink !== "") {
    hasPdf = true;
  };

  if (slideLink !== "") {
    hasSlide = true;
  };

  const { currentIdClass, setCurrentIdClass, currentClassTitle, setCurrentClassTitle, setCurrentUrlClassVideo } = useClassItem();

  const [isSelected, setIsSelected] = useState<boolean>(currentIdClass === classId);

  const extractIdVideo = (linkAula: string): string => {
    const match = linkAula.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?]+)/);
    if (match && match[1]) {
      return match[1];
    } else {
      return "dQw4w9WgXcQ"; // never gonna let you down
    };
  };

  const handleChangeClass = () => {
    setCurrentClassTitle(classTitle!);
    setCurrentIdClass(classId!);
    const videoId = extractIdVideo(videoUrl!); //extrai o id do video
    setCurrentUrlClassVideo(videoId);
  }
  useEffect(() => {
    setIsSelected(classId === currentIdClass);
  }, [currentIdClass])

  return (
    <div
      className={cn(
        "flex justify-between hover:bg-zinc-200/30 transition duration-300 ease-in-out cursor-pointer rounded-md px-1 gap-2 items-center ",
        isSelected && "bg-zinc-200/70 dark:bg-zinc-200/50"
      )}
    >
      <div className="flex items-center gap-2 ">
        <Checkbox></Checkbox>
      </div>

      <div className="w-full h-10 flex items-center" onClick={handleChangeClass}>

        <p className="">{classTitle}</p>
      </div>

      <div className="">
        {hasPdf ? (
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost"> <FileText size={16} /> </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-32 text-center">
              PDF da Aula.
            </HoverCardContent>
          </HoverCard>
        ) : null}

        {hasSlide ? (
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost"> <Monitor size={16} /> </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-32 text-center">
              Slide da Aula
            </HoverCardContent>
          </HoverCard>
        ) : null}

        <Popover>
          <PopoverTrigger>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="ghost"> <EllipsisVertical size={16} /> </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-32 text-center">
                Mais opções
              </HoverCardContent>
            </HoverCard>
          </PopoverTrigger>
          <PopoverContent className="dark:bg-white dark:text-black w-36 text-xs content-center items-center justify-center space-y-2">
            <p className="flex gap-1 items-center"><FileText size={16} />Baixar em pdf</p>
            <p className="flex gap-1 items-center"> <File size={16} />Baixar em docx</p>
          </PopoverContent>
        </Popover>
      </div>

    </div >
  );
};


