
import { ModeToggle } from "@/components/mode-toggle";
import { useListClasses } from "@/components/providers/classes-list-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListClasses } from "./list-classes";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";

export const SideBar = () => {

  const { listClasses } = useListClasses();

  return (
    <div className="h-full justify-between border-r flex flex-col overflow-y-auto shadow-sm pt-6 bg- dark:bg-dark-color px-4">
      <div className="p-x6 h-full space-y-6">

        <div className="flex flex-col w-full h-full">
          <Tabs defaultValue="default" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="default" className="w-1/2">Video Aulas</TabsTrigger>
              <TabsTrigger value="anotations" className="w-1/2">Questionario</TabsTrigger>
            </TabsList>

            <TabsContent value="default" className="flex flex-col gap-4 py-8">

              <div className="flex justify-between py-2">
                <div className="">
                  <p className="text-xs uppercase font-bold">Conteúdo</p>
                  <p className="text-md">Machine Learning</p>
                </div>
                <div className="text-blue-700 flex text-xs"> Ver tudo <ChevronRight size="16" /></div>
              </div>

              <div className="flex justify-between py-2">
                <div className="">
                  <p className="text-xs uppercase font-bold">Tags</p>
                  <p className="text-md">Machine Learning</p>
                </div>
                <div className="text-blue-700 flex text-xs"> Ver tudo <ChevronRight size="16" /></div>
              </div>


              <div className="flex border rounded-xl items-center p-2 gap-2">
                <Input
                  placeholder="pesquisa por aula"
                  className="border-none focus:border-blue-500"
                />
                <Search />
              </div>

              <ListClasses></ListClasses>
            </TabsContent>
            <TabsContent value="anotations">Mariano</TabsContent>
          </Tabs>

        </div>
      </div>

      {listClasses.map((module) => (
        <div key={module.id}>{module.moduleTitle}</div>
      ))}

      <div className="w-full p-6 flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
};

