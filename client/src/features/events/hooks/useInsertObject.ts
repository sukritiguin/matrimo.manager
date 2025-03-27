import * as fabric from "fabric";
import { debounce } from "lodash";
import { ChangeEvent, useCallback } from "react";
import { useEditorCanvas } from "./useEditorCanvas";
import { DEFAULT_BORDER_COLOR, ShapeElement, TextTemplate } from "../constants";
import { TUpload } from "@/types/canvas";

export const useInsertObject = () => {
  const { canvas, canvasContainerRef } = useEditorCanvas();

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

  const onAddText = useCallback(
    (data: TextTemplate, left = 50, top = 50) => {
      if (!canvas) {
        console.error("Canvas not found!");
        return;
      }

      const newText = new fabric.Textbox(data.preview, {
        left,
        top,
        ...data.options,
      });

      canvas.add(newText);
      canvas.setActiveObject(newText);
      newText.canvas?.renderAll();

      console.log("Text added successfully", newText);
    },
    [canvas]
  );

  const onAddElement = useCallback(
    (element: ShapeElement, left = 50, top = 50) => {
      if (!canvas) {
        console.error("Canvas not found!");
        return;
      }

      let newElement: fabric.Object | null = null;
      switch (element.type) {
        case "rect":
          newElement = new fabric.Rect({
            width: 100,
            height: 100,
            borderColor: DEFAULT_BORDER_COLOR,
          });
          break;
        case "circle":
          newElement = new fabric.Circle({
            radius: 50,
          });
          break;
        case "triangle":
          newElement = new fabric.Triangle({
            width: 100,
            height: 100,
            originX: "center",
            originY: "center",
          });
          break;
        case "line":
          newElement = new fabric.Line([50, 100, 250, 100], {
            stroke: DEFAULT_BORDER_COLOR,
            strokeWidth: 2,
          });
          break;
        case "star":
          newElement = new fabric.Polygon([
            { x: 50, y: 0 },
            { x: 61, y: 35 },
            { x: 98, y: 35 },
            { x: 68, y: 57 },
            { x: 79, y: 91 },
            { x: 50, y: 70 },
            { x: 21, y: 91 },
            { x: 32, y: 57 },
            { x: 2, y: 35 },
            { x: 39, y: 35 },
          ]);
          break;
        default:
          console.error(`Unsupported element: ${element.name}`);
          break;
      }

      if (newElement) {
        newElement.set("left", left);
        newElement.set("top", top);
        canvas.add(newElement);
        canvas.setActiveObject(newElement);
        newElement.canvas?.requestRenderAll();

        console.log("Element added successfully", newElement);
      }
    },
    [canvas]
  );

  const onAddUploadImage = useCallback(
    async (data: TUpload, left = 50, top = 50) => {
      if (!canvas) {
        console.error("Canvas not found!");
        return;
      }

      const image = await fabric.FabricImage.fromURL(data.url, {
        crossOrigin: "anonymous",
      });
      image.set("left", left);
      image.set("top", top);
      canvas.add(image);
      canvas.setActiveObject(image);
      canvas.requestRenderAll();

      console.log("Image uploaded successfully", image);
    },
    [canvas]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const clientX = event.clientX - canvasContainerRef.current!.offsetLeft;
      const clientY = event.clientY - canvasContainerRef.current!.offsetTop;

      if (event.dataTransfer) {
        const { type, data } = JSON.parse(event?.dataTransfer?.getData("text/plain"));

        // text, uploads, elements, photos
        switch (type) {
          case "text":
            onAddText(data as TextTemplate, clientX, clientY);
            break;
          case "element":
            onAddElement(data as ShapeElement, clientX, clientY);
            break;
          case "uploads":
            onAddUploadImage(data as TUpload, clientX, clientY);
            break;
          default:
            console.error(`Unsupported element: ${type}`);
            break;
        }
      }
    },
    [canvasContainerRef, onAddText, onAddElement, onAddUploadImage]
  );

  const handleClickToInsert = debounce((type: string, data: any) => {
    switch (type) {
      case "text":
        onAddText(data as TextTemplate);
        break;
      case "element":
        onAddElement(data as ShapeElement);
        break;
      case "uploads":
        console.log(type, data);
        break;
      default:
        console.error(`Unsupported element: ${type}`);
        break;
    }
  }, 200);

  return {
    handleChangeImage,
    handleDrop,
    handleClickToInsert,
  };
};
