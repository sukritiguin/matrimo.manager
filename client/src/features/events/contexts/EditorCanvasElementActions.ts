import { createReactContext } from "@/lib/createReactContext";
import { useEditorCanvas } from "../hooks/useEditorCanvas";
import { Object } from "fabric";
import { useEffect, useState } from "react";
import { useColorPicker } from "@/hooks/useColorPicker";

export const EditorCanvasElementActions = createReactContext(() => {
  const { canvas } = useEditorCanvas();

  const [selectedObjects, setSelectedObjects] = useState<Object[]>([]);
  const [editableObject, setEditableObject] = useState<Object | null>(null);

  const updateObjectProperty = (property: string, value: any) => {
    if (!canvas || !editableObject) return;

    if (property in editableObject) {
      editableObject.set(property, value);
      canvas.renderAll();
    } else {
      console.warn(`Property "${property}" is not allowed for ${editableObject.type}`);
    }
  };

  const textColor = useColorPicker("#000000", (color) => updateObjectProperty("fill", color));
  const borderColor = useColorPicker("#000000", (color) => updateObjectProperty("stroke", color));
  const backgroundColor = useColorPicker("#fff", (color) => updateObjectProperty("fill", color));

  const deleteObject = () => {
    if (!canvas || selectedObjects.length === 0) return;

    selectedObjects.forEach((obj) => canvas.remove(obj));
    setSelectedObjects([]);
    setEditableObject(null);
  };

  useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = () => {
      const selected = canvas.getActiveObjects();
      setSelectedObjects(selected);
      if (selected.length > 0) {
        setEditableObject(selected[0]);
      } else {
        setEditableObject(null);
      }
    };

    const handleSelectionCleared = () => {
      setSelectedObjects([]);
      setEditableObject(null);
    };

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);
    canvas.on("after:render", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas]);

  return {
    textColor,
    borderColor,
    backgroundColor,
    deleteObject,
    editableObject,
    selectedObjects,
    updateObjectProperty,
  };
});
