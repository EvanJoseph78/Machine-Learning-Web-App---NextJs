import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const authorsList = [
  {
    name: "Evandro Mariano",
    formation: "Bacharelando em Sistemas de Informação",
    urlImg: "https://via.placeholder.com/150", // Substitua pelo URL da imagem real
  },
  {
    name: "Joseph Evans",
    formation: "Bacharelando em Ciência da Computação",
    urlImg: "https://via.placeholder.com/150", // Substitua pelo URL da imagem real
  },
  {
    name: "Outro Autor",
    formation: "Bacharelando em Ciência da Computação",
    urlImg: "https://via.placeholder.com/150", // Substitua pelo URL da imagem real
  },
  {
    name: "Outro Autor",
    formation: "Bacharelando em Ciência da Computação",
    urlImg: "https://via.placeholder.com/150", // Substitua pelo URL da imagem real
  },
  // Adicione mais autores conforme necessário
];

export function AuthorsList() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-3xl"
    >
      <CarouselContent>
        {authorsList.map((author, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-2">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <img
                    src={author.urlImg}
                    alt={author.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center">{author.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{author.formation}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

