
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

export interface Question {
  enunciado: string;
  opcoes: Option[];
  _id: string;
}

export interface Course {
  _id: string;
  nome: string;
  introducao?: string;
  descricao?: string;
  duracao?: number;
  disciplina?: string;
  nivel?: string;
  certificado?: boolean;
  topicos?: string[];
  professores?: Teacher[];
  linkcapa?: string;
  modulos?: Module[];
  questoes?: Question[];
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}
