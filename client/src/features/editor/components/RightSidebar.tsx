"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  ImageIcon,
  Italic,
  Lock,
  Minus,
  Plus,
  Scissors,
  Type,
  Underline,
  Unlock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const RightSidebar: React.FC = () => {
  return (
    <div className="w-xs border-l overflow-y-auto">
      <Tabs defaultValue="properties">
        <TabsList className="w-full">
          <TabsTrigger value="properties" className="flex-1">
            Properties
          </TabsTrigger>
          <TabsTrigger value="layers" className="flex-1">
            Layers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="p-4">
          <Accordion type="single" collapsible defaultValue="position">
            <AccordionItem value="element">
              <AccordionTrigger>Element</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label htmlFor="element-name">Name</Label>
                  <Input id="element-name" placeholder="Element name" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Copy className="h-3.5 w-3.5" /> Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Scissors className="h-3.5 w-3.5" /> Cut
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Minus className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="position">
              <AccordionTrigger>Position & Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="pos-x" className="text-xs">
                        X
                      </Label>
                      <Input id="pos-x" type="number" defaultValue="0" />
                    </div>
                    <div>
                      <Label htmlFor="pos-y" className="text-xs">
                        Y
                      </Label>
                      <Input id="pos-y" type="number" defaultValue="0" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Size</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="width" className="text-xs">
                        Width
                      </Label>
                      <Input id="width" type="number" defaultValue="100" />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-xs">
                        Height
                      </Label>
                      <Input id="height" type="number" defaultValue="100" />
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <input type="checkbox" id="lock-ratio" className="mr-2" />
                    <Label htmlFor="lock-ratio" className="text-xs">
                      Lock aspect ratio
                    </Label>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label htmlFor="rotation">Rotation</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="rotation"
                      defaultValue={[0]}
                      max={360}
                      step={1}
                    />
                    <span className="text-sm w-8 text-right">0°</span>
                  </div>
                </div>

                <div className="flex justify-between mt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <AlignLeft className="h-3.5 w-3.5" /> Left
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <AlignCenter className="h-3.5 w-3.5" /> Center
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <AlignRight className="h-3.5 w-3.5" /> Right
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="style">
              <AccordionTrigger>Style</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label htmlFor="opacity">Opacity</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="opacity"
                      defaultValue={[100]}
                      max={100}
                      step={1}
                    />
                    <span className="text-sm w-8 text-right">100%</span>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label htmlFor="fill-color">Fill Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="fill-color"
                      type="color"
                      defaultValue="#000000"
                      className="w-12 h-8 p-1"
                    />
                    <Input defaultValue="#000000" className="flex-1" />
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label htmlFor="stroke-color">Stroke Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stroke-color"
                      type="color"
                      defaultValue="#000000"
                      className="w-12 h-8 p-1"
                    />
                    <Input defaultValue="#000000" className="flex-1" />
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label htmlFor="stroke-width">Stroke Width</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="stroke-width"
                      defaultValue={[0]}
                      max={20}
                      step={1}
                    />
                    <span className="text-sm w-8 text-right">0px</span>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Effects</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      Shadow
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      Blur
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="text">
              <AccordionTrigger>Text Options</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label htmlFor="text-content">Text</Label>
                  <Textarea id="text-content" placeholder="Enter text" />
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Font</Label>
                  <Select defaultValue="arial">
                    <SelectTrigger>
                      <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="verdana">Verdana</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="playfair">Playfair Display</SelectItem>
                      <SelectItem value="dancingscript">
                        Dancing Script
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Size</Label>
                  <div className="flex items-center gap-2">
                    <Slider defaultValue={[16]} min={8} max={72} step={1} />
                    <span className="text-sm w-8 text-right">16px</span>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Style</Label>
                  <ToggleGroup type="multiple" className="justify-start">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Toggle underline"
                    >
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Alignment</Label>
                  <ToggleGroup type="single" className="justify-start">
                    <ToggleGroupItem value="left" aria-label="Align left">
                      <AlignLeft className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Align center">
                      <AlignCenter className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Align right">
                      <AlignRight className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="justify" aria-label="Justify">
                      <AlignJustify className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Line Height</Label>
                  <div className="flex items-center gap-2">
                    <Slider defaultValue={[1.5]} min={0.5} max={3} step={0.1} />
                    <span className="text-sm w-8 text-right">1.5</span>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Letter Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Slider defaultValue={[0]} min={-5} max={10} step={0.5} />
                    <span className="text-sm w-8 text-right">0px</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="orientation">
              <AccordionTrigger>Orientation & Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Orientation</Label>
                    <div className="flex gap-2">
                      <Button
                        // variant={
                        //     orientation === "portrait" ? "default" : "outline"
                        // }
                        className="flex-1"
                        // onClick={() => {
                        //   if (orientation !== "portrait") toggleOrientation();
                        // }}
                      >
                        Portrait
                      </Button>
                      <Button
                        // variant={
                        //   orientation === "landscape" ? "default" : "outline"
                        // }
                        className="flex-1"
                        // onClick={() => {
                        //   if (orientation !== "landscape") toggleOrientation();
                        // }}
                      >
                        Landscape
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Size</Label>
                    <Select
                    //   value={canvasSize}
                    //   onValueChange={handleCanvasSizeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* {Object.entries(
                          orientation === "portrait"
                            ? CANVAS_PRESETS.portrait
                            : CANVAS_PRESETS.landscape
                        ).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value.name}
                          </SelectItem>
                        ))} */}
                        <SelectItem value="custom">Custom Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Custom Dimensions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="canvas-width" className="text-xs">
                          Width (in)
                        </Label>
                        <Input
                          id="canvas-width"
                          type="number"
                          step={0.1}
                          min={1}
                        />
                      </div>
                      <div>
                        <Label htmlFor="canvas-height" className="text-xs">
                          Height (in)
                        </Label>
                        <Input
                          id="canvas-height"
                          type="number"
                          step={0.1}
                          min={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="layers" className="p-4">
          <div className="flex justify-between mb-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Layer
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Type className="h-3.5 w-3.5" /> Add Text
            </Button>
          </div>

          <div className="border rounded-md">
            {/* Sample layers - in a real app, these would be dynamically generated */}
            <div
            //   className={`flex items-center justify-between p-2 hover:bg-accent ${selectedElement === "layer1" ? "bg-accent" : ""}`}
            //   onClick={() => setSelectedElement("layer1")}
            >
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-sm">Heading Text</span>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Lock className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div
            //   className={`flex items-center justify-between p-2 hover:bg-accent ${selectedElement === "layer2" ? "bg-accent" : ""}`}
            //   onClick={() => setSelectedElement("layer2")}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="text-sm">Background Image</span>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Unlock className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div
            //   className={`flex items-center justify-between p-2 hover:bg-accent ${selectedElement === "layer3" ? "bg-accent" : ""}`}
            //   onClick={() => setSelectedElement("layer3")}
            >
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-sm">Details Text</span>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Unlock className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronUp className="h-3.5 w-3.5" /> Move Up
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronDown className="h-3.5 w-3.5" /> Move Down
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
