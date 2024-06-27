"use client"

import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Footer from '../_components/footer';
import { AuthorsList } from '../_components/authors-list';
import Link from 'next/link';

const Home = () => {
  // Estado para armazenar os autores do projeto
  // const [authors, setAuthors] = useState([]);

  // Função para buscar os autores do projeto (pode ser de uma API ou arquivo JSON)
  // useEffect(() => {
  //   // Simulando uma chamada de API para buscar os autores
  //   const fetchAuthors = async () => {
  //     const response = await fetch('/api/authors'); // Ajuste o caminho conforme necessário
  //     const data = await response.json();
  //     setAuthors(data);
  //   };
  //
  //   fetchAuthors();
  // }, []);

  return (
    <div className='flex justify-center items-center flex-col gap-8 w-screen'>
      <header className='flex flex-col justify-center items-center py-16 px-2 gap-4'>
        <h1 className='text-4xl font-semibold text-center'>
          Sejam muito bem-vindos
        </h1>
        <p className='max-w-[600px] text-center'>
          Acesse cursos gratuitos sobre tecnologia criados por alunos para alunos.
        </p>
        <div className='space-x-2'>
          <Link href={"/courses"}>
            <Button>Iniciar</Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button variant={"ghost"} className='border'>Login</Button>
          </Link>
        </div>
      </header>

      <div className='px-2 text-center'>
        <h1 className="text-3xl font-bold mb-4">Sobre a Plataforma</h1>

        <p className="text-lg mb-8 text-center max-w-2xl">
          O nosso projeto tem como objetivo oferecer cursos de
          Machine Learning para a comunidade interna e externa de Castanhal.
          Na plataforma, os usuários podem acessar esses cursos de forma gratuita.
          No futuro, pretendemos democratizar ainda mais a criação de cursos, permitindo que qualquer aluno
          interessado possa criar e disponibilizar seus próprios cursos na plataforma.
        </p>

      </div>

      <div className='flex justify-center items-center w-screen px-16 flex-col border-t py-8'>
        <h1 className="text-3xl font-bold mb-4">Autores do projeto</h1>
        <AuthorsList></AuthorsList>
      </div>

      {/* <Footer></Footer> */}

    </div>
  );
};

export default Home;
