"use client";

import * as React from "react";
import { ToolTip } from "@/components/common/tooltip";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ImageIcon,
  Italic,
  Layers,
  Underline,
} from "lucide-react";
import { Separator } from "@/components/ui/seperator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CanvasButtonToolbar: React.FC = () => {
  return (
    <div className="border-t p-2 flex items-center justify-center gap-2 flex-wrap">
      <div className="flex items-center gap-1 mr-2">
        <ToolTip text="Bold">
          <Button variant="ghost" size="icon">
            <Bold className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip text="Italic">
          <Button variant="ghost" size="icon">
            <Italic className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip text="Underline">
          <Button variant="ghost" size="icon">
            <Underline className="h-4 w-4" />
          </Button>
        </ToolTip>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1 mx-2">
        <ToolTip text="Align Left">
          <Button variant="ghost" size="icon">
            <AlignLeft className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip text="Align Center">
          <Button variant="ghost" size="icon">
            <AlignCenter className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip text="Align Right">
          <Button variant="ghost" size="icon">
            <AlignRight className="h-4 w-4" />
          </Button>
        </ToolTip>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2 mx-2">
        <Select defaultValue="16">
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12px</SelectItem>
            <SelectItem value="14">14px</SelectItem>
            <SelectItem value="16">16px</SelectItem>
            <SelectItem value="20">20px</SelectItem>
            <SelectItem value="24">24px</SelectItem>
            <SelectItem value="32">32px</SelectItem>
            <SelectItem value="48">48px</SelectItem>
            <SelectItem value="64">64px</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="arial">
          <SelectTrigger className="w-32">
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
            <SelectItem value="dancingscript">Dancing Script</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1 mx-2">
        <ToolTip text="Layers">
          <Button variant="ghost" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip text="Upload Image">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </ToolTip>
      </div>
    </div>
  );
};
