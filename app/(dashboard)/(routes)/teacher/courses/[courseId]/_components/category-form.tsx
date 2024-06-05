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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

// Definição do esquema de validação para o formulário
const formSchema = z.object({
  categoryId: z.string(),
});

// Props esperadas pelo componente CategoryForm
interface CategoryFormProps {
  initialData: Course | null;
  courseId: string;
  options: { label: string; value: string }[];
}

// Componente CategoryForm para exibir e editar a categoria do curso
export const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
  // Estado para controlar se o formulário está no modo de edição ou não
  const [isEditing, setIsEditing] = useState(false);
  // Hook useRouter para acessar o objeto de roteamento do Next.js
  const router = useRouter();

  // Hook useForm para gerenciar o estado do formulário e suas validações
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "" // Valor inicial para o campo categoryId
    },
  });

  // Desestruturação do estado do formulário para acessar informações úteis
  const { isSubmitting, isValid } = form.formState;

  // Estado para armazenar a opção selecionada no Combobox
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(
    options.find((option) => option.value === initialData?.categoryId) || null
  );

  // Função para lidar com a submissão do formulário
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Enviar uma solicitação PATCH para atualizar a categoria do curso
      await axios.patch(`http://localhost:8080/api/courses/${courseId}`, values);
      // Exibir uma mensagem de sucesso ao usuário
      toast.success("Curso Atualizado");
      // Atualizar a opção selecionada com base nos valores do formulário
      const updatedOption = options.find(option => option.value === values.categoryId) || null;
      setSelectedOption(updatedOption);
      // Atualizar a página após a submissão bem-sucedida
      router.refresh();
      // Alternar o modo de edição para falso após a submissão bem-sucedida
      setIsEditing(false);
    } catch (error) {
      // Em caso de erro, exibir uma mensagem de erro ao usuário
      toast.error("Algo deu errado!");
    }
  };

  // Renderização condicional com base no modo de edição
  return (
    <div className="mt-6 rounded-xl p-4 border shadow-md">
      <div className="font-medium flex items-center justify-between">
        Categoria do curso
        {/* Botão para alternar entre o modo de edição e visualização */}
        <Button variant={"ghost"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" />Editar</>}
        </Button>
      </div>
      {!isEditing && (
        // Renderização da categoria visualizada
        <p className={cn(
          "text-sm mt-2",
          !initialData?._id && "text-slate-500 italic"
        )}>
          {selectedOption?.label || "Sem categoria"}
        </p>
      )}

      {isEditing && (
        // Renderização do formulário de edição
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Campo de formulário para a categoria */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Componente Combobox para seleção da categoria */}
                    <Combobox
                      options={options}
                      {...field}
                    />
                  </FormControl>
                  {/* Exibir mensagens de erro do formulário, se houver */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              {/* Botão de envio do formulário */}
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

