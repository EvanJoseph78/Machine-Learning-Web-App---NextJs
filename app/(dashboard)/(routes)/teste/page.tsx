"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import YouTube from "react-youtube";

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
    <div className="h-screen overflow-y-scroll">
      <div className="">box1</div>
      <div className="w-60 h-60 bg-cyan-600 sticky top-0">

        <div className="rounded-md">
          <YouTube
            videoId={"aoVH4Yelums"}
          />
        </div>

      </div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>

      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>

      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>

      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>

      <div className="">box1</div>
      <div className="">box2</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>

      <div className="">box1</div>
      <div className="">box2</div>
      <div className="">box3</div>
      <div className="">box3</div>
      <div className="">box3</div>

      <div className="">box1</div>
      <div className="">box2</div>
      <div className="">box3</div>
    </div>
  );
};

export default Test;
