"use client";

import React, { useEffect, useState } from "react";
import { useCanvasStore } from "../stores/useCanvasStore";
import * as fabric from "fabric";

export const Canvas: React.FC = () => {
  const { canvas, initCanvas } = useCanvasStore();
  const [selectObject, setSelectedElement] = useState<fabric.Object[]>([]);

  // Initial render
  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    if (!canvas) return;

    // const activeObject = canvas.getActiveObject();

    canvas.on("selection:created", function (e) {
      console.log("Object selected:", e.selected);
      setSelectedElement([...e.selected]);
    });

    canvas.on("selection:updated", function (e) {
      console.log("Selection updated:", e.selected);
    });

    canvas.on("selection:cleared", function (e) {
      setSelectedElement([]);
      canvas.requestRenderAll();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "Delete" || event.key === "Backspace") && canvas) {
        if (selectObject.length > 0) {
          selectObject.forEach((obj) => canvas.remove(obj));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, selectObject]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-1 w-full justify-center items-center h-full overflow-auto bg-muted">
        <div
          id="editorCanvasContainer"
          className={`w-full border border-muted shadow-xl rounded-md overflow-hidden`}
          style={
            {
              // cursor: panEnabled ? (isDragging ? "grabbing" : "grab") : "default",
            }
          }
        >
          <canvas id="editorCanvas" />
        </div>
      </div>
    </div>
  );
};
