"use client"

import { ClassItemProvider } from "@/components/providers/class-provider";
import { QuestionItemProvider } from "@/components/providers/questions-provider";

const classContextValue = {
  currentIdClass: "123",
  currentClassTitle: "Mathematics 101",
  currentUrlCassVideo: "http://example.com/video"
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <ClassItemProvider>
      <QuestionItemProvider>
        <div className="h-full w-full dark:bg-dark-color flex flex-row">
          <main className="h-full w-full flex flex-col">
            {children}
          </main>
        </div>
      </QuestionItemProvider>

    </ClassItemProvider>
  );

};
export default DashboardLayout;
