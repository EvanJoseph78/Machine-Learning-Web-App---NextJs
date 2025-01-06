import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Instructor } from "@prisma/client";

interface ProjectAuthorsProps {
  authorsList: Instructor[];
}

export const ProjectAuthors = ({ authorsList }: ProjectAuthorsProps) => {
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
                    src={
                      author.profileUrl ??
                      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    alt={author.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center">
                    {author.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {author.formation1}
                  </p>
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
};
