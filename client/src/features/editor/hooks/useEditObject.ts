import * as React from "react";
import * as fabric from "fabric";
import { useColorPicker } from "@/hooks/useColorPicker";
import { useCanvasContext } from "./useCanvasContext";

export const useEditObject = () => {
  const { canvas } = useCanvasContext();
  const [selectedObjects, setSelectedObjects] = React.useState<fabric.Object[]>([]);
  const [editableObject, setEditableObject] = React.useState<fabric.Object | null>(null);

  // Universal update function based on object type
  const updateObjectProperty = (property: string, value: any) => {
    if (!canvas || selectedObjects.length === 0) return;

    selectedObjects.forEach((obj) => {
      if (isPropertyAllowed(obj, property)) {
        obj.set(property, value);
      }
    });

    canvas.renderAll();
  };

  // Check if the property is valid for the selected object type
  const isPropertyAllowed = (obj: fabric.Object, property: string) => {
    const objectType = obj.type;
    const allowedProperties: Record<string, string[]> = {
      // 📝 Text-Based Objects
      "i-text": [
        "text",
        "fontSize",
        "fontWeight",
        "fontStyle",
        "textAlign",
        "fill",
        "stroke",
        "strokeWidth",
        "opacity",
      ],
      textbox: [
        "text",
        "fontSize",
        "fontWeight",
        "fontStyle",
        "textAlign",
        "fill",
        "stroke",
        "strokeWidth",
        "opacity",
      ],

      // 🔲 Basic Shapes
      rect: ["width", "height", "fill", "stroke", "strokeWidth", "opacity", "rx", "ry"],
      circle: ["radius", "fill", "stroke", "strokeWidth", "opacity"],
      triangle: ["width", "height", "fill", "stroke", "strokeWidth", "opacity"],

      // 🔵 Ellipse Shape
      ellipse: ["rx", "ry", "fill", "stroke", "strokeWidth", "opacity"],

      // 🌟 Polygon (Custom Multi-Sided Shape)
      polygon: ["fill", "stroke", "strokeWidth", "opacity"],

      // ⏹️ Line & Path
      line: ["x1", "y1", "x2", "y2", "stroke", "strokeWidth", "opacity"],
      path: ["fill", "stroke", "strokeWidth", "opacity"],

      // 🌅 Image
      image: ["opacity", "flipX", "flipY", "angle", "scaleX", "scaleY"],

      // 🎭 Grouped Objects
      group: ["opacity", "scaleX", "scaleY", "angle"],

      // 🖊 Free Draw (Pencil Brush)
      "path-group": ["stroke", "strokeWidth", "opacity"],
    };

    return allowedProperties[objectType]?.includes(property);
  };

  // Color Pickers (Common for all objects)
  const textColor = useColorPicker("#000000", (color) => updateObjectProperty("fill", color));
  const borderColor = useColorPicker("#000000", (color) => updateObjectProperty("stroke", color));

  // Delete Object
  const deleteObject = () => {
    if (!canvas || selectedObjects.length === 0) return;

    selectedObjects.forEach((obj) => canvas.remove(obj));
    setSelectedObjects([]);
    setEditableObject(null);
  };

  // Handle selection changes
  React.useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = (e: { selected: fabric.FabricObject[] }) => {
      const selected = e.selected || [];
      setSelectedObjects(selected);
      setEditableObject(selected.length > 0 ? selected[0] : null);
    };

    const handleSelectionCleared = () => {
      setSelectedObjects([]);
      setEditableObject(null);
    };

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas]);

  return {
    textColor,
    borderColor,
    selectedObjects,
    editableObject,
    updateObjectProperty, // Centralized property updater
    deleteObject,
  };
};
