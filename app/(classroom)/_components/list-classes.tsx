import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ClassItem } from "./class-item";
import useCourseData from "@/hooks/useCourse";

interface listClassesProps {
  courseId: string,
}

export function ListClasses({ courseId }: listClassesProps) {

  // const { listClasses } = useListClasses();

  const { course, listClasses, setListClasses, isLoading, error } = useCourseData(courseId);

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {listClasses.map((module) => (
          <AccordionItem value={module.id} key={module.id}>
            <AccordionTrigger >
              <div className="text-justify mr-4">
                {module.moduleNumber} - {module.moduleTitle}
              </div>
            </AccordionTrigger>
            {module.classes.map((classItem) => (
              <AccordionContent key={classItem.id}>
                <ClassItem
                  classId={classItem.id}
                  classNumber={classItem.classNumber}
                  classTitle={classItem.classTitle}
                  videoUrl={classItem.videoUrl}
                ></ClassItem>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

