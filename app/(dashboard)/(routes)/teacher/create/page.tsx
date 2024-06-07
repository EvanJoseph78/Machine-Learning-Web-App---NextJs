"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  courseTitle: z.string().min(1, {
    message: "O título é necessário"
  }),
});

const CreatePage = () => {

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Curso criado com sucesso!");
    } catch {
      toast.error("Algo deu errado!");
    };
  };


  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Nome do curso</h1>

        <p>Qual o courseTitle do curso? Você pode alterar depois.</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>
                    Título do Curso
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="exemplo: Curso de Machine Learning"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    O que será abordado neste curso?
                  </FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            >
            </FormField>

            <div className="flex items-center gap-x-2">
              <Link href={"/"}>
                <Button
                  type="button"
                  variant={"ghost"}
                >Cancelar</Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >Continuar</Button>
            </div>
          </form>
        </Form >

      </div >
    </div >
  );
};

export default CreatePage;
