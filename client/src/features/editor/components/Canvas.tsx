"use client";

import React, { useEffect, useState } from "react";
import { useCanvasStore } from "../stores/useCanvasStore";
import * as fabric from "fabric";
import { useColorPicker } from "@/hooks/useColorPicker";
import { ColorPicker } from "@/components/color-picker";
import { ToolTip } from "@/components/common/tooltip";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from "../constants";

export const Canvas: React.FC = () => {
  const { canvas, initCanvas } = useCanvasStore();
  const backgroundColor = useColorPicker(DEFAULT_BACKGROUND_COLOR);
  const textColor = useColorPicker("#000000");
  const borderColor = useColorPicker(DEFAULT_BORDER_COLOR);

  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [editableObject, setEditableObject] = useState<fabric.Object | null>(
    null
  );

  // Initialize canvas on mount
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Handle canvas events
  useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = (e: any) => {
      const selected = e.selected || [];
      setSelectedObjects(selected);
      setEditableObject(selected[0] || null);
    };

    const handleSelectionUpdated = (e: any) => {
      const selected = e.selected || [];
      setSelectedObjects(selected);
      setEditableObject(selected[0] || null);
    };

    const handleSelectionCleared = () => {
      setSelectedObjects([]);
      setEditableObject(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!canvas) return;

      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedObjects.length > 0) {
          selectedObjects.forEach((obj) => canvas.remove(obj));
          setSelectedObjects([]);
          setEditableObject(null);
        }
      }
    };

    // Attach event listeners
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionUpdated);
    canvas.on("selection:cleared", handleSelectionCleared);
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners
    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionUpdated);
      canvas.off("selection:cleared", handleSelectionCleared);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, selectedObjects]);

  // Update object properties when color changes
  useEffect(() => {
    if (!canvas || !editableObject) return;

    if (editableObject.type === "textbox") {
      editableObject.set("fill", textColor.color);
    } else {
      editableObject.set("fill", backgroundColor.color);
      editableObject.set("stroke", borderColor.color);
    }

    canvas.renderAll();
  }, [
    canvas,
    editableObject,
    backgroundColor.color,
    textColor.color,
    borderColor.color,
  ]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="py-1 w-full flex items-center justify-center px-4 absolute">
        <div
          className={`flex items-center bg-card ring px-4 py-1 rounded-2xl transition-all duration-500 ${editableObject ? "opacity-100" : "opacity-0"}`}
        >
          {editableObject?.type === "textbox" && (
            <ToolTip text="Text color">
              <ColorPicker
                {...textColor}
                defaultColor={editableObject.backgroundColor}
              />
            </ToolTip>
          )}
          {editableObject?.type !== "textbox" && (
            <div className="flex gap-2">
              <ColorPicker {...backgroundColor} />
              <ColorPicker {...borderColor} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 w-full justify-center items-center h-full overflow-auto bg-muted">
        <div
          id="editorCanvasContainer"
          className="w-full border border-muted shadow-xl rounded-md overflow-hidden"
        >
          <canvas id="editorCanvas" />
        </div>
      </div>
    </div>
  );
};
