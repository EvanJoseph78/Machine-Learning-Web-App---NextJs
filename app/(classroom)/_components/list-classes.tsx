"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ClassItem } from "./class-item";
import useCourseData from "@/hooks/useCourse";
import { useClassItem } from "@/components/providers/class-provider";

interface listClassesProps {
  courseId: string,
}

export function ListClasses({ courseId }: listClassesProps) {

  const { listClasses } = useCourseData(courseId);

  const { currentModuleId, setCurrentModuleId } = useClassItem();

  return (
    <div>
      <Accordion type="single" collapsible className="w-full" value={currentModuleId} >
        {listClasses.map((module) => (
          <AccordionItem value={module.id} key={module.id}>
            <AccordionTrigger onClick={() => { setCurrentModuleId(module.id) }}>
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
                  courseId={courseId}
                  moduleId={module.id}
                ></ClassItem>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}


