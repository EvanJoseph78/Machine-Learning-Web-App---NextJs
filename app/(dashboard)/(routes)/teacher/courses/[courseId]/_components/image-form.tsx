"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { Course } from "@/lib/types";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course | null;
  courseId: string;
}

const formSchema = z.object({
  linkcapa: z.string().min(1, {
    message: "Capa do curso é obrigatória",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [courseData, setCourseData] = useState<Course | null>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
      setCourseData(response.data);
    } catch (error) {
      console.error("Failed to fetch course data", error);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchCourseData();
    }
  }, [courseId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values);
      toast.success("Curso Atualizado");
      fetchCourseData(); // Fetch the updated course data
      toggleEdit();
      router.refresh(); // Refresh the route
    } catch (error) {
      toast.error("Algo deu errado!");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Capa do curso
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing && (
            <div className="">Cancelar</div>
          )}

          {!isEditing && !initialData?.linkcapa && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Imagem
            </>
          )}

          {!isEditing && initialData?.linkcapa && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData?.linkcapa ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500"></ImageIcon>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md "
              src={courseData?.linkcapa || initialData?.linkcapa}
            ></Image>
          </div>
        )
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ linkcapa: url })
              }
            }}
          />
          <div className="text-xs to-muted-foreground mt-4">
            Resolução recomendada: 16:9
          </div>
        </div>
      )
      }
    </div >
  );
};

