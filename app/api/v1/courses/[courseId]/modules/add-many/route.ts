import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: {
    params: { courseId: string }
  }
) {
  try {
    // const modules = await req.json();
    //
    // const createdModules = [];
    //
    // const { courseId } = params;
    //
    // // Verifica se o curso existe
    // const course = await db.courses.findUnique({
    //   where: { id: courseId },
    // });
    //
    // if (!course) {
    //   return new NextResponse('Curso não encontrado', { status: 404 });
    // }
    //
    // for (const module of modules) {
    //   const { moduleNumber, moduleTitle, moduleClasses } = module;
    //
    //   // Criar o módulo
    //   const createdModule = await db.modules.create({
    //     data: {
    //       moduleNumber: moduleNumber,
    //       moduleTitle: moduleTitle,
    //     },
    //   });
    //
    //   // Criar as aulas vinculadas ao módulo recém-criado
    //   const createdClasses = [];
    //   for (const aula of moduleClasses) {
    //     const { classTitle, classNumber, videoUrl } = aula;
    //
    //     const createdClass = await db.classes.create({
    //       data: {
    //         classTitle: classTitle,
    //         classNumber: classNumber,
    //         modulesId: createdModule.id,
    //         videoUrl: videoUrl,
    //       },
    //     });
    //
    //     createdClasses.push(createdClass);
    //   }
    //
    //   // Atualiza o curso para incluir o novo módulo
    //   await db.courses.update({
    //     where: { id: courseId },
    //     data: {
    //       modules: {
    //         connect: { id: createdModule.id },
    //       },
    //     },
    //   });
    //
    //   createdModules.push({
    //     module: createdModule,
    //     classes: createdClasses,
    //   });
    // }

    // return NextResponse.json({ createdModules }, { status: 201 });
    return NextResponse.json("ok", { status: 201 });
  } catch (error) {
    console.error('[MODULES_CREATION_ERROR]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

