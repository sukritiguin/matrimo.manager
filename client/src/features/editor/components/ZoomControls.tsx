import * as React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  return (
    <div className="absolute z-10 bottom-4 right-4 flex  items-center gap-2 bg-muted-foreground border p-1 rounded-md">
      <Button onClick={onZoomIn} size="icon" variant="outline">
        <ZoomIn className="size-4" />
      </Button>
      <div className="text-gray-900 text-center">{zoomLevel.toFixed(2)}</div>
      <Button onClick={onZoomOut} size="icon" variant="outline">
        <ZoomOut className="size-4" />
      </Button>
      <Button onClick={onResetZoom} size="icon" variant="outline">
        <RotateCcw className="size-4" />
      </Button>
    </div>
  );
};
