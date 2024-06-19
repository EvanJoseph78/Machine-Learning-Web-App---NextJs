import { Button } from "@/components/ui/button"
import { Pencil, Plus, X } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Classes, Modules } from "@prisma/client"
import { useEffect, useState } from "react"
import { Buda } from "next/font/google"
import { ListClasses } from "@/lib/types"
import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

import { Input } from "@/components/ui/input";

interface ModuleItemProps {
  classesList: Modules[] | null
  classesList2: ListClasses[] | null
}


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

export const ModuleItem = ({ classesList, classesList2 }: ModuleItemProps) => {

  return (

    <div className="">
      {classesList2?.map((moduleItem) => (
        <Accordion type="single" collapsible className="" key={moduleItem.id}>

          <AccordionItem value="item-1" className="">

            <AccordionTrigger>{moduleItem.moduleTitle}</AccordionTrigger>

            {moduleItem.classes.map((classItem) => (
              <AccordionContent className="">
                <div className="flex justify-between items-center space-y-1 ml-2">
                  <p>{classItem.classTitle}</p>
                  <Button className="h-8">editar</Button>
                </div>
              </AccordionContent>
            ))}

            <AccordionContent className="ml-2 flex gap-2 justify-between">
              <div className="flex h-full w-full items-center py-1 justify-between gap-2">
                <Input
                  // disabled={isSubmitting}
                  placeholder="Adicionar Aula"
                />
                <Button className="h-full">Adicionar</Button>
              </div>
            </AccordionContent>

          </AccordionItem>
        </Accordion>
      ))}

    </div>
  )
}

