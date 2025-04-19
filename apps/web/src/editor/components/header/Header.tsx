import * as React from "react";
import { EditorTitle } from "./Title";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useEditorStore } from "@/editor/store/useEditorStore";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Header: React.FC = () => {
  return (
    <div className="fixed z-50 w-full top-12 h-12 border-b bg-background">
      <div className="flex w-full items-center justify-between gap-4 h-full px-6">
        <div className="basis-1/3"></div>
        <EditorTitle />
        <div className="flex items-center justify-end gap-2 basis-1/3">
          <ZoomSection />
        </div>
      </div>
    </div>
  );
};

const ZoomSection: React.FC = () => {
  const { canvas, zoom, setZoom } = useEditorStore();

  React.useEffect(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const activeObjectCenter = activeObject.getCenterPoint();
      canvas.zoomToPoint(activeObjectCenter, zoom / 100);
      canvas.setViewportTransform(canvas.viewportTransform);
    } else {
      canvas.setZoom(zoom / 100);
    }
  }, [zoom, canvas]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => setZoom(zoom - 10)}>
        <ZoomOut className="size-4" />
      </Button>
      <div className="flex flex-col items-center justify-center">
        <span className="pb-1">{zoom} %</span>
        <Slider
          className="w-40"
          min={50}
          max={300}
          value={[zoom]}
          onValueChange={([value]) => setZoom(value)}
        />
      </div>
      <Button variant="outline" size="icon" onClick={() => setZoom(zoom + 10)}>
        <ZoomIn className="size-4" />
      </Button>
    </div>
  );
};
