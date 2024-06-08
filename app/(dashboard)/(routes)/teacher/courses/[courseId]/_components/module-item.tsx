import { Button } from "@/components/ui/button"
import { Pencil, X } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ModuleItemProps {
  moduleName: string
}

// export const ModuleItem = ({ moduleName }: ModuleItemProps) => {
//   return (
//     <div className="py-1 rounded-md px-2 items-center border">
//       <div className="flex w-full justify-between  ">
//         <p className="text-md">{moduleName}</p>
//         <div className="flex items-center gap-2">
//           <Button variant={"default"} size={"xs"}><Pencil /></Button>
//           <Button variant={"destructive"} size={"xs"}><X /></Button>
//         </div>
//       </div>
//     </div>
//   )
// }
//
const classes = [
  {
    id: "1",
    classTitle: "O que é aprendizado de máquina",
    classNumber: "1",
    moduleNumber: "1",
    moduleTitle: "Machine Learning",
    urlVideo: "url",
    urlCover: "url",
    urlExtraMaterial: "pdf"
  },
  {
    id: "2",
    classTitle: "Direito constitucional",
    classNumber: "2",
    moduleNumber: "1",
    moduleTitle: "Machine Learning",
    urlVideo: "url",
    urlCover: "url",
    urlExtraMaterial: "pdf"
  },
  {
    id: "3",
    classTitle: "Matemática",
    classNumber: "3",
    moduleNumber: "2",
    moduleTitle: "Deep Learning",
    urlVideo: "url",
    urlCover: "url",
    urlExtraMaterial: "pdf"
  },
  {
    id: "4",
    classTitle: "Portuguei",
    classNumber: "4",
    moduleNumber: "2",
    moduleTitle: "Deep Learning1",
    urlVideo: "url",
    urlCover: "url",
    urlExtraMaterial: "pdf"
  },
];

export const ModuleItem = ({ moduleName }: ModuleItemProps) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{moduleName}</AccordionTrigger>

          {classes.map((item) => (
            <AccordionContent key={item.id}>
              {item.classTitle}
            </AccordionContent>
          ))}


        </AccordionItem>
      </Accordion>
    </div>
  )
}
