import * as fabric from "fabric";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR, elements } from "../constants";
import { useCanvasContext } from "./useCanvasContext";
import { ChangeEvent } from "react";

const DEFAULT_OPTIONS_INSERT_OBJECT = {
  left: 100,
  top: 100,
  fill: DEFAULT_BACKGROUND_COLOR,
  stroke: DEFAULT_BORDER_COLOR,
};

export const useInsertObject = () => {
  const { canvas } = useCanvasContext();

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("file: " + file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result && typeof e.target.result === "string" && canvas) {
        const img = await fabric.Image.fromURL(e.target.result);

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
      }
    };
    reader.readAsDataURL(file);
  };

  const onAddObject = (elementId: (typeof elements)[number]["id"]) => {
    if (!canvas) {
      console.error("Canvas not found!");
      return;
    }

    let element: fabric.Object | null = null;
    switch (elementId) {
      case "text":
        element = new fabric.Textbox("Text", {
          width: 200,
          height: 100,
          fontSize: 24,
          fontFamily: "Helvetica",
          ...DEFAULT_OPTIONS_INSERT_OBJECT,
          fill: "#333",
        });
        break;
      case "rectangle":
        element = new fabric.Rect({
          width: 100,
          height: 100,
          transparentCorners: false,
          hasBorders: true,
          borderColor: DEFAULT_BORDER_COLOR,
          ...DEFAULT_OPTIONS_INSERT_OBJECT,
        });
        break;
      case "circle":
        element = new fabric.Circle({
          radius: 50,
          ...DEFAULT_OPTIONS_INSERT_OBJECT,
        });
        break;
      case "triangle":
        element = new fabric.Triangle({
          width: 100,
          height: 100,
          originX: "center",
          originY: "center",
          ...DEFAULT_OPTIONS_INSERT_OBJECT,
        });
        break;
      case "image":
        {
          const addImageInput = document.getElementById("addImage") as HTMLInputElement;
          if (addImageInput) {
            console.log("Opening file picker...");
            addImageInput.click();
          } else {
            console.error("File input #addImage not found!");
          }
        }
        break;
      default:
        console.error(`Unsupported element: ${elementId}`);
        break;
    }

    if (element) {
      canvas.add(element);
      canvas.setActiveObject(element);
      canvas.requestRenderAll();

      const jsonData = canvas.toJSON();

      console.log("Element added successfully", element);
    }
  };

  return {
    onAddObject,
    handleChangeImage,
  };
};
