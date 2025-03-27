import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Grid, InspectionPanel } from "lucide-react";
import { ToolTip } from "@/components/common/tooltip";
import { ScreenShareIcon as ScreenRotation } from "lucide-react";
import { DEFAULT_ZOOM_LABEL, MAX_ZOOM_LABEL, MIN_ZOOM_LABEL } from "../constants";

import { useState } from "react";
import { ColorPicker } from "@/components/color-picker";
import { useEditorActions } from "../hooks/useEditorActions";
import { useEditorCanvasState } from "../hooks/useEditorCanvasState";

export const EditorToolbarHeader = () => {
  const {
    onToggleOrientation,
    backgroundColorPicker,
    changeCanvasPreset,
    handleZoom,
    showGrid,
    onToggleGrid,
  } = useEditorActions();

  const { canvasPresets, orientation, selectedCanvasPreset, zoomLevel } = useEditorCanvasState();

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <ToolTip text={showGrid ? "Hide Grid" : "Show Grid"}>
          <Button variant={showGrid ? "default" : "outline"} size="icon" onClick={onToggleGrid}>
            <Grid className="h-4 w-4" />
          </Button>
        </ToolTip>

        <ToolTip text={orientation === "Portrait" ? "Switch to Landscape" : "Switch to Portrait"}>
          <Button
            variant={orientation === "Landscape" ? "outline" : "default"}
            size="icon"
            onClick={onToggleOrientation}
          >
            <ScreenRotation className="h-4 w-4" />
          </Button>
        </ToolTip>

        <Select value={selectedCanvasPreset.id} onValueChange={changeCanvasPreset}>
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

      {/* Background Color Picker */}
      <ColorPicker
        {...backgroundColorPicker}
        title="Background"
        className="border py-1 px-2 flex items-center rounded-sm bg-muted"
      />

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
            <Button variant="outline" size="icon" onClick={() => handleZoom(DEFAULT_ZOOM_LABEL)}>
              <InspectionPanel className="size-4" />
            </Button>
          </ToolTip>
        </div>
      </div>
    </div>
  );
};
