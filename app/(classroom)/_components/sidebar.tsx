
import { ModeToggle } from "@/components/mode-toggle";
import { ListClasses } from "./list-classes";
import { ChevronRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { QuestionsList } from "./questions-list";

interface SideBarProps {
  courseId: string
}

export const SideBar = ({ courseId }: SideBarProps) => {

  return (
    <Tabs defaultValue="account" className="w-full md:h-screen py-6 px-2 overflow-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Video Aulas</TabsTrigger>
        <TabsTrigger value="password">Questionário</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="">
        <Card className="space-y-4">
          <CardHeader>
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

          </CardHeader>

          <CardContent className="space-y-2">
            <ListClasses courseId={courseId}></ListClasses>
          </CardContent>
          <CardFooter>
            {/* <Button>Save changes</Button> */}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Questionário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            Você pode realizar o questinário quantas três vezes em um dia. Para obter o certificado do curso
            é necessário acertar 70% das questões.
          </CardContent>
          <CardFooter>
            <QuestionsList courseId={courseId}></QuestionsList>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

