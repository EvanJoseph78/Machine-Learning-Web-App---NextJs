import { Classes, Course, Courses, Modules, Options, Questions, Tag } from "@prisma/client";

// types.ts
export interface Teacher {
  imgperfil: string;
  nome: string;
  formacao1: string;
  formacao2?: string;
  _id: string;
}

export interface Class {
  numeroaula: number;
  titulo: string;
  linkaula: string;
  linkcapa: string;
  materiaisextras?: string;
  _id: string;
}

export interface Module {
  numeromodulo: number;
  titulo: string;
  linkcapa: string;
  _id: string;
  aulas: Class[];
}

export interface Option {
  texto: string;
  correta: boolean;
  _id: string;
}

// export interface Course {
//   id: string;
//   userId?: string
//   courseTitle?: string;
//   introduction?: string
//   duration?: number
//   subject?: string
//   level?: string;
//   certificate?: boolean;
//   description?: string;
//   imageUrl?: string
//   categoryId?: string
//   tags?: string
//   subscribedUsers?: string[];
//   createdAt: string;
//   updatedAt: string;
//   tagsId: string
// }
//
export interface Category {
  id: string;
  name: string;
  courses: string[]
}

export interface Attachment {
  _id: string;
  name: string;
  url: string;
}

export type ListClasses = Modules & {
  classes: Classes[]
};

export type ListQuestions = Questions & {
  options: Options[]
}

export type CourseItemData = Courses & {
  totalLessons: number
}

// ===========================================================

export type CourseWithTags = Course & { Tag: Tag[] };
