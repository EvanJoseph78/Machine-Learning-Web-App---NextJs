"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { Course } from "@/lib/types";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

// Interface que define as propriedades aceitas pelo componente ImageForm
interface ImageFormProps {
  initialData: Course | null;  // Dados iniciais do curso
  courseId: string;  // ID do curso
}

// Esquema de validação para o formulário utilizando Zod
const formSchema = z.object({
  linkcapa: z.string().min(1, {
    message: "Capa do curso é obrigatória",
  }),
});

// Componente funcional que renderiza e gerencia o formulário de imagem do curso
export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  // Estado que armazena o URL da imagem do curso
  const [urlImage, setUrlImage] = useState<string | undefined>(initialData?.linkcapa);
  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  // Função para alternar entre os modos de edição e visualização
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  // Função chamada ao submeter o formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Faz a requisição PATCH para atualizar os dados do curso
      await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values);
      toast.success("Curso Atualizado");
      setUrlImage(values.linkcapa);  // Atualiza o estado com o novo URL da imagem
      toggleEdit();  // Sai do modo de edição
      router.refresh(); // Recarrega a rota para refletir as mudanças
    } catch (error) {
      toast.error("Algo deu errado!");  // Exibe uma mensagem de erro em caso de falha
    }
  };

  return (
    <div className="mt-6 rounded-xl p-4 border shadow-md">
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
        !urlImage ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500"></ImageIcon>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md "
              src={urlImage}
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
      )}
    </div>
  );
};
