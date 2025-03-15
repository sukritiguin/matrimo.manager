import * as React from "react";
import * as fabric from "fabric";
import { useColorPicker } from "@/hooks/useColorPicker";
import { useCanvasContext } from "./useCanvasContext";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from "../constants";

export const useEditObject = () => {
  const { canvas } = useCanvasContext();
  const textColor = useColorPicker("#000000");

  const [selectedObjects, setSelectedObjects] = React.useState<fabric.Object[]>([]);
  const [editableObject, setEditableObject] = React.useState<fabric.Object | null>(null);

  const backgroundColor = useColorPicker(DEFAULT_BACKGROUND_COLOR, (currColor) => {
    if (canvas) {
      selectedObjects.forEach((obj) => {
        obj.set("backgroundColor", currColor);
      });
      canvas.renderAll();
    }
  });

  const borderColor = useColorPicker(DEFAULT_BORDER_COLOR, (color) => {
    if (canvas) {
      selectedObjects.forEach((obj) => {
        obj.set("stroke", color);
      });
      canvas.renderAll();
    }
  });

  const deleteObject = () => {
    if (selectedObjects.length > 0 && canvas) {
      selectedObjects.forEach((obj) => canvas.remove(obj));
      setSelectedObjects([]);
      setEditableObject(null);
    }
  };

  React.useEffect(() => {
    if (!canvas) return;

    // Handle object selection
    const handleSelectionCreated = (e: { selected: fabric.FabricObject[] }) => {
      const selected = e.selected || [];
      setSelectedObjects(selected);
      if (selected.length > 0) {
        const activeObject = selected[0];
        setEditableObject(activeObject);
        backgroundColor.setColor(activeObject.backgroundColor as string);
        console.log(activeObject.strokeBorders);
      }
    };

    // Handle object deselection
    const handleSelectionCleared = () => {
      setSelectedObjects([]);
      setEditableObject(null);
    };

    // Handle object updates (e.g., when properties are changed)
    const handleSelectionUpdated = (e: any) => {
      const selected = e.selected || [];
      setSelectedObjects(selected);
    };

    // Attach event listeners
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionUpdated);
    canvas.on("selection:cleared", handleSelectionCleared);

    // Cleanup event listeners
    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionUpdated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas, backgroundColor]);

  return {
    backgroundColor,
    textColor,
    borderColor,
    selectedObjects,
    setEditableObject,
    editableObject,
    setSelectedObjects,
    deleteObject,
  };
};
