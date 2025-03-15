import * as React from "react";
import * as fabric from "fabric";
import { useColorPicker } from "@/hooks/useColorPicker";
import { useCanvasContext } from "./useCanvasContext";

export const AllowedProperties = {
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
    "fontFamily",
    "fontWeight",
    "fontStyle",
    "textAlign",
    "fill",
    "stroke",
    "strokeWidth",
    "opacity",
    "underline",
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
} as const;

export const useEditObject = () => {
  const { canvas } = useCanvasContext();
  const [selectedObjects, setSelectedObjects] = React.useState<fabric.Object[]>([]);
  const [editableObject, setEditableObject] = React.useState<any>(null);

  // Universal update function based on object type
  const updateObjectProperty = <T extends keyof typeof AllowedProperties>(
    property: (typeof AllowedProperties)[T][number],
    value: any
  ) => {
    if (!canvas || !editableObject) return;

    if (property in editableObject) {
      editableObject.set(property, value);
      canvas.renderAll();
    } else {
      console.warn(`Property "${property}" is not allowed for ${editableObject.type}`);
    }
  };

  // Color Pickers (Common for all objects)
  const textColor = useColorPicker("#000000", (color) => updateObjectProperty("fill", color));
  const borderColor = useColorPicker("#000000", (color) => updateObjectProperty("stroke", color));
  const backgroundColor = useColorPicker("#fff", (color) => updateObjectProperty("fill", color));

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
    selectedObjects,
    editableObject,
    updateObjectProperty, // Centralized property updater
    deleteObject,
  };
};
