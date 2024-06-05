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
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// Define as propriedades aceitas pelo componente DescriptionForm
interface DescriptionFormProps {
  initialData: Course | null;  // Dados iniciais do curso, pode ser null
  courseId: string;  // ID do curso
}

// Define o esquema de validação do formulário usando Zod
const formSchema = z.object({
  descricao: z.string().min(1, {
    message: "Nome do curso é obrigatório",
  }),
});

// Define o componente funcional DescriptionForm
export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);  // Estado para controlar o modo de edição
  const [description, setDescription] = useState<string | undefined>(initialData?.descricao);  // Estado para a descrição do curso

  // Função para alternar entre os modos de edição e visualização
  const toggleEdit = () => setIsEditing((current) => !current);

  // Configuração do formulário usando react-hook-form e zodResolver para validação
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { descricao: initialData?.descricao || "" },
  });

  const { isSubmitting, isValid } = form.formState;  // Estado do formulário

  // Função para manipular a submissão do formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values);  // Envia a atualização para a API
      toast.success("Curso Atualizado");  // Exibe uma notificação de sucesso
      setDescription(values.descricao);  // Atualiza a descrição no estado local
      toggleEdit();  // Alterna para o modo de visualização
    } catch (error) {
      toast.error("Algo deu errado!");  // Exibe uma notificação de erro
    }
  };

  return (
    <div className="mt-6 rounded-xl p-4 border shadow-md">
      <div className="font-medium flex items-center justify-between">
        Descrição do curso
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
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !description && "text-slate-500 italic"
        )}>
          {description || "Sem descrição"}
        </p>
      )}

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
