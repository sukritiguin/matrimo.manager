import { Canvas } from "fabric";
import { useAppSelector } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useEditTemplate } from "../hooks/useEditTemplate";
import { createReactContext } from "@/lib/createReactContext";

export const EditorCanvasProvider = createReactContext(() => {
  const { canvasData } = useEditTemplate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const { selectedCanvasPreset } = useAppSelector((state) => state.canvas);

  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const width = canvasData?.width || selectedCanvasPreset.width;
    const height = canvasData?.height || selectedCanvasPreset.height;
    canvasContainerRef.current.style.width = `${width * 96}px`;
    canvasContainerRef.current.style.height = `${height * 96}px`;

    let newCanvas = canvas;
    if (!newCanvas) {
      newCanvas = new Canvas(canvasRef.current!, {
        width: canvasContainerRef.current.offsetWidth,
        height: canvasContainerRef.current.offsetHeight,
      });
    }

    setCanvas(newCanvas);
  }, [canvas]);

  useEffect(() => {
    if (!canvas || !canvasData) return;

    console.log("Loading canvas data:", canvasData);

    canvas.loadFromJSON(canvasData, () => {
      console.log("Canvas JSON Loaded!");

      // Force re-render after objects are fully loaded
      canvas.renderAll();
      canvas.requestRenderAll(); // Ensures all elements are drawn
    });
  }, [canvas, canvasData]);

  useEffect(() => {
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  return {
    canvas,
    canvasRef,
    canvasContainerRef,
  };
});
