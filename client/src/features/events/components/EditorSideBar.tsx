import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar, SidebarHeader, SidebarContent } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  GripVertical,
  Image,
  Layers,
  Plus,
  Search,
  Settings,
  Text,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router-dom";
import { useInsertObject } from "../hooks/useInsertObject";
import { useEditorCanvasSidbar } from "../hooks/useEditorCanvasSidbar";
import { EditorTitle } from "./EditorTitle";
import { Image as CustomImage } from "@/components/image";

export const EditorSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { handleClickToInsert } = useInsertObject();
  const {
    handleSearch,
    dragging,
    activeTab,
    onChangeTab,
    inputRef,
    getInputProps,
    getRootProps,
    handleDragEnd,
    handleDragStart,
    isDragActive,
    uploads,
    textTemplates,
    shapeElements,
    stockPhotos,
    loadMorePhotos,
    isFetching,
  } = useEditorCanvasSidbar();

  console.log(stockPhotos);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-3 h-16">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <EditorTitle />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          {/* <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar> */}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <Tabs value={activeTab} onValueChange={onChangeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
            <TabsTrigger value="text" className="py-2">
              <Text className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="uploads" className="py-2">
              <Upload className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="elements" className="py-2">
              <Layers className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="photos" className="py-2">
              <Image className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search ${activeTab}...`}
                className="pl-8"
                onChange={handleSearch}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-11rem)]">
            {/* Text */}
            <TabsContent value="text" className="m-0 p-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium">Text styles</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <Plus className="mr-1 h-3 w-3" /> Add text
                </Button>
              </div>
              <div className="space-y-3">
                {textTemplates.map((template) => (
                  <div
                    key={template.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "text", template)}
                    onDragEnd={() => handleDragEnd()}
                    onClick={() => handleClickToInsert("text", template)}
                    className={cn(
                      "flex cursor-grab items-center rounded-md border bg-card p-3 transition-all hover:border-primary",
                      dragging === template.id && "border-primary opacity-50"
                    )}
                  >
                    <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div className={cn("flex-1")} style={template.options as React.CSSProperties}>
                      {template.preview}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Uploads */}
            <TabsContent value="uploads" className="m-0 p-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium">Your uploads</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => inputRef.current.click()}
                >
                  <Plus className="mr-1 h-3 w-3" /> Upload
                </Button>
              </div>

              <div
                {...getRootProps()}
                className={cn(
                  "mb-4 rounded-md border-2 border-dashed p-6 text-center transition-colors",
                  isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                )}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF, SVG</p>
              </div>

              {uploads.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {uploads.map((file, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, `uploads`, uploads[index])}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleClickToInsert(`uploads`, uploads[index])}
                      className={cn(
                        "group relative aspect-video cursor-grab overflow-hidden rounded-md border bg-muted",
                        dragging === `upload-${index}` && "border-primary opacity-50"
                      )}
                    >
                      <img src={file.url} alt={file.filename} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/50 p-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {file.filename}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ELEMENTS */}
            <TabsContent value="elements" className="m-0 p-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium">Shapes & elements</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <Plus className="mr-1 h-3 w-3" /> Create
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {shapeElements.map((element) => (
                  <div
                    key={element.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, "element", element)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleClickToInsert("element", element)}
                    className={cn(
                      "group flex aspect-square cursor-grab flex-col items-center justify-center rounded-md border bg-card p-2 transition-all hover:border-primary",
                      dragging === element.id && "border-primary opacity-50"
                    )}
                  >
                    <div className="h-12 w-12 rounded-md" style={element.style} />
                    {/* <span className="mt-1 text-xs">{element.name}</span> */}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Photo */}
            <TabsContent value="photos" className="m-0 p-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium">Stock photos</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <Plus className="mr-1 h-3 w-3" /> More
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stockPhotos &&
                  stockPhotos.map((photo: any, index: any) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, "photos", photo)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        "group relative aspect-video cursor-grab overflow-hidden rounded-md border",
                        dragging === photo.id && "border-primary opacity-50"
                      )}
                    >
                      <CustomImage
                        src={photo.src.small || "/placeholder.svg"}
                        alt={photo.alt || ""}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-0 w-full bg-black/50 p-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {photo.photographer}
                      </div>
                    </div>
                  ))}
              </div>
              <button
                onClick={loadMorePhotos}
                disabled={isFetching}
                className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                  isFetching
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                }`}
              >
                {isFetching ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                    Loading...
                  </div>
                ) : (
                  "Load More"
                )}
              </button>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SidebarContent>
      {/* <div className="w-xs border-r max-h-[100%-64px] overflow-y-scroll">
        <Tabs value={activeTab} onValueChange={onChangeTab} className="flex h-full">
          <div className="flex h-full">
            <TabsList className="max-w-20 flex flex-col py-8 h-full">
              <TabsTrigger value="elements" className="flex-1">
                Elements
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex-1">
                Templates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="elements" className="p-4">
              <ElementsTabContent elements={elements} onAddElement={onAddObject} />
            </TabsContent>
            <TabsContent value="templates" className="p-4">
              <TemplatesTabContent templates={templates} onTemplatesSelect={handleTemplateSelect} />
            </TabsContent>
          </div>
        </Tabs>
        <input
          type="file"
          id="addImage"
          className="hidden"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div> */}
    </Sidebar>
  );
};
