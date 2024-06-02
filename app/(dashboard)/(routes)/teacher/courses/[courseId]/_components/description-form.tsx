"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Course } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  initialData: Course | null;
  courseId: string;
}

const formSchema = z.object({
  descricao: z.string().min(1, {
    message: "Nome do curso é obrigatório",
  }),
});

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { descricao: courseData?.descricao || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values);
      toast.success("Curso Atualizado");
      fetchCourseData(); // Fetch the updated course data
      router.refresh(); // Refresh the route
      toggleEdit();
    } catch (error) {
      toast.error("Algo deu errado!");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Descrição do curso
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <div className="">Cancel</div>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        <p className={cn(
          "text-sm mt-2",
          !initialData?.descricao && "text-slate-500 italic"
        )}>
          {courseData?.descricao || "Sem descrição"}
        </p>
      }

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 ">
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Exemplo: este curso é sobre..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

