import * as fabric from "fabric";
import { useAppSelector } from "@/lib/utils";
import React, { createContext, RefObject, useEffect } from "react";
import { DEFAULT_BACKGROUND_COLOR } from "../constants";

interface State {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasContainerRef: RefObject<HTMLDivElement | null>;
  canvas: fabric.Canvas | null;
}

const CanvasContext = createContext<State | undefined>(undefined);

const CanvasProvider: React.FC<{
  children: React.ReactNode;
  initialCanvas: fabric.Canvas | null;
}> = ({ children, initialCanvas }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!canvas) return;

      // Handle object deletion
      if (event.key === "Delete") {
        const activeObject = canvas.getActiveObjects();
        if (activeObject.length > 0) {
          activeObject.forEach((obj) => {
            if (event.key === "Delete" && !obj.isType("textbox")) {
              canvas.remove(obj);
            }
          });
          canvas.discardActiveObject();
        }
      }
    },
    [canvas]
  );

  const {
    zoomLevel,
    selectedCanvasPreset: { width, height },
  } = useAppSelector((state) => state.canvas);

  React.useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current || canvas) return;

    canvasContainerRef.current.style.width = `${width * 96}px`;
    canvasContainerRef.current.style.height = `${height * 96}px`;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
      backgroundColor: DEFAULT_BACKGROUND_COLOR,
    });

    if (initialCanvas) {
      console.log("Initial canvas", initialCanvas);
      newCanvas.loadFromJSON(initialCanvas.toJSON());
    }

    newCanvas.renderAll();
    newCanvas.setZoom(zoomLevel / 100);
    setCanvas(newCanvas);
  }, []);
  console.log("Canvas", canvas);

  // handle window events
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Zooming
  useEffect(() => {
    if (!canvas || !canvasContainerRef.current) return;

    const point = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    const value = zoomLevel / 100;
    canvas.zoomToPoint(point, value);
    canvas.renderAll();
    canvasContainerRef.current.style.transform = `scale(${zoomLevel / 100})`;
  }, [zoomLevel, canvas]);

  return (
    <CanvasContext.Provider value={{ canvasRef, canvasContainerRef, canvas }}>
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext, CanvasProvider };
