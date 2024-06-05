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

import { Course } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// Interface que define as propriedades aceitas pelo componente TitleForm
interface TitleFormProps {
  initialData: Course | null;  // Dados iniciais do curso
  courseId: string;  // ID do curso
}

// Esquema de validação para o formulário utilizando Zod
const formSchema = z.object({
  nome: z.string().min(1, {
    message: "Nome do curso é obrigatório",
  }),
});

// Componente funcional que renderiza e gerencia o formulário de título do curso
export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [courseData, setCourseData] = useState<Course | null>(initialData); // Estado que armazena os dados do curso
  const [title, setTitle] = useState<string | undefined>(initialData?.nome); // Estado que armazena o título do curso
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
  const toggleEdit = () => setIsEditing((current) => !current); // Função para alternar entre os modos de edição e visualização

  // Hook do React Hook Form para gerenciar o formulário e sua validação
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: courseData?.nome || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  // Função chamada ao submeter o formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values); // Faz a requisição PATCH para atualizar os dados do curso
      toast.success("Curso Atualizado"); // Exibe uma mensagem de sucesso
      setTitle(values.nome); // Atualiza o título no estado
      toggleEdit(); // Sai do modo de edição
    } catch (error) {
      toast.error("Algo deu errado!"); // Exibe uma mensagem de erro em caso de falha
    }
  };

  return (
    <div className="mt-6 rounded-xl p-4 border shadow-md">
      <div className="font-medium flex items-center justify-between">
        Título do curso
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <div className="">Cancelar</div>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{title}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 ">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Exemplo: Curso Avançado de desenvolvimento web"
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
