"use client";

import * as React from "react";
import { ToolTip } from "@/components/common/tooltip";
import { Button } from "@/components/ui/button";
import { Grid, InspectionPanel } from "lucide-react";
import {
  DEFAULT_BACKGROUND_COLOR,
  MAX_ZOOM_LABEL,
  MIN_ZOOM_LABEL,
} from "../constants";

import { ZoomIn, ZoomOut } from "lucide-react";
import { ScreenShareIcon as ScreenRotation } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCanvasStore } from "../stores/useCanvasStore";
import { Slider } from "@/components/ui/slider";

import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useColorPicker } from "@/hooks/useColorPicker";

export const CanvasToolbar: React.FC = () => {
  const {
    canvas,
    orientation,
    canvasPresets,
    toggleOrientation,
    selectedCanvasPreset,
    changeCanvasPreset,
    zoomLevel,
    handleZoom,
    resetZoom,
  } = useCanvasStore();
  const [showGrid, setShowGrid] = React.useState(false);

  const fontColorPicker = useColorPicker("black");
  const backgroundColorPicker = useColorPicker(DEFAULT_BACKGROUND_COLOR);

  const handleColorChange = (color: string) => {
    backgroundColorPicker.setColor(color);
    console.log("Current Color is: ", color);
    if (canvas) {
      canvas.backgroundColor = color;
      canvas.requestRenderAll();
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <ToolTip text={showGrid ? "Hide Grid" : "Show Grid"}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowGrid(!showGrid)}
            className={showGrid ? "bg-accent" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip
          text={
            orientation === "Portrait"
              ? "Switch to Landscape"
              : "Switch to Portrait"
          }
        >
          <Button
            variant={orientation === "Landscape" ? "outline" : "default"}
            size="icon"
            onClick={toggleOrientation}
          >
            <ScreenRotation className="h-4 w-4" />
          </Button>
        </ToolTip>

        <Select
          value={selectedCanvasPreset.id}
          onValueChange={changeCanvasPreset}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {canvasPresets.map((preset) => (
              <SelectItem key={preset.name} value={preset.id}>
                {preset.name}
              </SelectItem>
            ))}
            {/* TODO: Make it later */}
            {/* <SelectItem value="custom">Custom Size</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <Popover
        open={fontColorPicker.isOpen}
        onOpenChange={fontColorPicker.setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button variant="outline">
            <span
              className="h-4 w-4 border rounded-full"
              style={{ backgroundColor: fontColorPicker.color }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-4">
          <HexColorPicker
            color={fontColorPicker.color}
            onChange={fontColorPicker.setColor}
          />
          <Input
            className="mt-2"
            value={fontColorPicker.color}
            onChange={(e) => fontColorPicker.setColor(e.target.value)}
          />
        </PopoverContent>
      </Popover>

      {/* Background Color Picker */}
      <Popover
        open={backgroundColorPicker.isOpen}
        onOpenChange={backgroundColorPicker.setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button variant="outline">
            <div>
              Background
              <span
                className="h-full w-8 border rounded-sm"
                style={{ backgroundColor: backgroundColorPicker.color }}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-4">
          <HexColorPicker
            color={backgroundColorPicker.color}
            onChange={(e) => handleColorChange(e)}
          />
          <Input
            className="mt-2"
            value={backgroundColorPicker.color}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </PopoverContent>
      </Popover>

      {/* Zoom handler */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ToolTip text="Zoom out">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleZoom("out")}
              disabled={zoomLevel <= MIN_ZOOM_LABEL}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </ToolTip>
          <div className="flex gap-2">
            <Slider
              value={[zoomLevel]}
              min={MIN_ZOOM_LABEL}
              max={MAX_ZOOM_LABEL}
              onValueChange={(value) => handleZoom(value[0])}
              className="w-24"
            />
            <span className="text-sm">{zoomLevel}%</span>
          </div>
          <ToolTip text="Zoom in">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleZoom("in")}
              disabled={zoomLevel >= MAX_ZOOM_LABEL}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </ToolTip>
          <ToolTip text="Reset zoom">
            <Button variant="outline" size="icon" onClick={resetZoom}>
              <InspectionPanel className="size-4" />
            </Button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
};
