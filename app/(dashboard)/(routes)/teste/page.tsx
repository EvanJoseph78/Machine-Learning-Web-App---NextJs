"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const Test = () => {
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

  const groupedClasses = classes.reduce((acc: any, item) => {
    if (!acc[item.moduleTitle]) {
      acc[item.moduleTitle] = [];
    }
    acc[item.moduleTitle].push(item);
    return acc;
  }, {});

  return (
    <div className="px-8">
      <Accordion type="single" collapsible className="w-full">
        {Object.keys(groupedClasses).map((moduleTitle) => (
          <AccordionItem key={moduleTitle} value={`module-${moduleTitle}`}>
            <AccordionTrigger>{moduleTitle}</AccordionTrigger>
            <AccordionContent>
              {groupedClasses[moduleTitle].map((classItem: any) => (
                <div key={classItem.id}>
                  <p>{classItem.classNumber} - {classItem.classTitle}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Test;
