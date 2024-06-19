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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Course, ListClasses } from "@/lib/types";
import { Pencil, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModuleItem } from "./module-item";
import { Modules } from "@prisma/client";

// Interface que define as propriedades aceitas pelo componente ModuleForm
interface ModuleFormProps {
  initialData: Modules[] | null;
  initialData2: ListClasses[] | null;
  courseId: string;  // ID do curso
}

// Esquema de validação para o formulário utilizando Zod
const formSchema = z.object({
  moduleTitle: z.string().min(1, {
    message: "Deve haver nome do módulo",
  }),
});

// Componente funcional que renderiza e gerencia o formulário de título do curso
export const ModuleForm = ({ initialData, courseId, initialData2 }: ModuleFormProps) => {
  const [classesList, setClassesList] = useState<Modules[] | null>([]);; // Estado que armazena os lista de modulos e aulas
  const [classesList2, setClassesList2] = useState<ListClasses[] | null>([]);; // Estado que armazena os lista de modulos e aulas
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(true); // Estado para controlar o modo de edição
  const toggleEdit = () => setIsEditing((current) => !current); // Função para alternar entre os modos de edição e visualização

  // Hook do React Hook Form para gerenciar o formulário e sua validação
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const test = () => {
    console.log(classesList);
  }

  useEffect(() => {
    // console.log(initialData);
    setIsLoading(false)
    setClassesList(initialData)
    setClassesList2(initialData2)
  }, [initialData])

  const { isSubmitting, isValid } = form.formState;

  // Função chamada ao submeter o formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values); // Faz a requisição PATCH para atualizar os dados do curso
      await axios.patch(`/api/courses/${courseId}/modules`, values); // Faz a requisição PATCH para atualizar os dados do curso
      toast.success("Curso Atualizado"); // Exibe uma mensagem de sucesso
      // setTitle(values.moduleTitle); // Atualiza o título no estado
      toggleEdit(); // Sai do modo de edição
    } catch (error) {
      toast.error("Algo deu errado!"); // Exibe uma mensagem de erro em caso de falha
    }
  };

  return (
    <div className="mt-6 rounded-xl p-4 border shadow-md">
      <div className="font-medium flex items-center justify-between">
        Novo módulo
      </div>

      <div className="space-y-2 w-full">
        <ModuleItem classesList={classesList} classesList2={classesList2}></ModuleItem>
        {/* {classesList?.map((module) => ( */}
        {/*   <div key={module.id}> */}
        {/*     {module.moduleTitle} */}
        {/*     {module.classes?.map((courseClass) => ( */}
        {/*       <div key={courseClass.id}>{courseClass.classTitle}</div> */}
        {/*     ))} */}
        {/*     <div></div> */}
        {/*   </div> */}
        {/* ))} */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 ">
          <FormField
            control={form.control}
            name="moduleTitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Adicionar novo módulo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit">
              <Plus />
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
