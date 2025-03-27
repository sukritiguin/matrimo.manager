"use client";

import React from "react";
import { Containter } from "@/components/layout/Containter";
import { TTemplate } from "@/types/template";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Image } from "@/components/image";
import { useEventsPage } from "../hooks/useEventsPage";

export const EventsPage: React.FC = () => {
  const { templates, error, isPending, onCreateNewEvent, handleClickTemplate } = useEventsPage();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Containter>
      <div className="w-full">
        {/* My library */}
        <section>
          <div className="flex w-full items-center justify-between">
            <div className="py-2">
              <h2 className="font-semibold">My library</h2>
              <p className="text-sm text-gray-600">Create, share, and collaborate</p>
            </div>
            <div className="">
              <Button className="" onClick={onCreateNewEvent}>
                <Plus />
                Create new event
              </Button>
            </div>
          </div>
          {/* My templates */}
          <div className="flex w-full overflow-x-auto py-2 scroll-smooth">
            {templates && templates.length > 0 ? (
              <div className="flex gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={handleClickTemplate}
                  />
                ))}
              </div>
            ) : (
              <NoTemplate />
            )}
          </div>
        </section>

        {/* Explore templates */}
        <section></section>
      </div>
    </Containter>
  );
};

export const TemplateCard: React.FC<{
  template: TTemplate;
  onClick: (template: TTemplate) => void;
}> = ({ template, onClick }) => {
  return (
    <Card
      className="w-40 md:w-48 lg:w-56 xl:w-64 flex-shrink-0 hover:cursor-pointer"
      onClick={() => onClick(template)}
    >
      <CardContent className="px-0">
        <Image
          src={template.image}
          alt={template.title}
          className="w-full aspect-square border border-primary rounded-t-md"
        />
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">{template.tags?.join(", ")}</p>
        </div>
        <div className="flex items-center gap-2">{template.title}</div>
      </CardFooter>
    </Card>
  );
};

export const NoTemplate = () => {
  return (
    <div className="w-full border border-dashed rounded-md p-4 h-40 flex flex-col gap-2 items-center justify-center">
      <p className="text-center text-sm text-muted-foreground">No templates found.</p>
      <p className="text-center text-sm">Create your first event or template!</p>
    </div>
  );
};
