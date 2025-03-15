import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { elements, templates } from "../constants";
import { useInsertObject } from "../hooks/useInsertObject";

export const LeftSidebar: React.FC = () => {
  const { onAddObject, handleChangeImage } = useInsertObject();

  const [activeTab, setActiveTab] = useState("elements");

  const handleTemplateSelect = (templateId: (typeof templates)[number]["id"]) => {
    // In a real implementation, we would load the template into the canvas
  };

  return (
    <div className="w-xs border-r max-h-[100%-64px] overflow-y-scroll">
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="elements" className="flex-1">
            Elements
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">
            Templates
          </TabsTrigger>
        </TabsList>
        <ElementsTabContent elements={elements} onAddElement={onAddObject} />

        {/* <TemplatesTabContent
          templates={templates}
          onTemplatesSelect={handleTemplateSelect}
        /> */}
      </Tabs>
      <input
        type="file"
        id="addImage"
        className="hidden"
        accept="image/*"
        onChange={handleChangeImage}
      />
    </div>
  );
};

const ElementsTabContent: React.FC<{
  elements: typeof elements;
  onAddElement: (id: (typeof elements)[number]["id"]) => void;
}> = ({ elements, onAddElement }) => {
  return (
    <TabsContent value="elements" className="p-4">
      <div className="grid gap-4">
        {/* <div className="flex items-center gap-2">
          <Label htmlFor="element-type">Type</Label>
          <Select defaultValue="all">
            <SelectTrigger id="element-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="shape">Shapes</SelectItem>
              <SelectItem value="decoration">Decorations</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className="grid grid-cols-3 gap-2">
          {elements.map((element) => (
            <Card
              key={element.id}
              className="cursor-pointer overflow-hidden"
              onClick={() => onAddElement(element.id)}
            >
              <CardContent className="p-2">
                <img
                  src={element.image || "/placeholder.svg"}
                  alt={element.name}
                  className="aspect-square object-cover rounded-sm w-full"
                />
                <p className="text-xs mt-1 truncate">{element.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};

const TemplatesTabContent: React.FC<{
  templates: typeof templates;
  onTemplatesSelect: (template: (typeof templates)[number]["id"]) => void;
}> = ({ templates, onTemplatesSelect }) => {
  return (
    <TabsContent value="templates" className="p-4">
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="category">Category</Label>
          <Select defaultValue="all">
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer overflow-hidden`}
              onClick={() => onTemplatesSelect(template.id)}
            >
              <CardContent className="p-2">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  //   className={`object-cover rounded-sm w-full ${orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                />
                <p className="text-xs mt-1 truncate">{template.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
