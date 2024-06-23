import { useListClasses } from "@/components/providers/classes-list-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ClassItem } from "./class-item";


export function ListClasses() {

  const { listClasses } = useListClasses();

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {listClasses.map((module) => (
          <AccordionItem value={module.id}>
            <AccordionTrigger >
              <div className="text-justify mr-4">
                {module.moduleTitle}
              </div>
            </AccordionTrigger>
            {module.classes.map((classItem) => (
              <AccordionContent>
                <ClassItem
                  classId={classItem.id}
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

