import { shapeDefinitions } from "@/editor/fabric/shapes/shape-definitions";
import { createShape } from "@/editor/fabric/shapes/shape-factory";
import { Canvas } from "fabric";

export const initializeFabric = async (
  canvasEl: HTMLCanvasElement,
  containerEl?: HTMLDivElement
) => {
  try {
    const { Canvas, PencilBrush } = await import("fabric");

    const canvas = new Canvas(canvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true,
    });

    //drawing init
    const brush = new PencilBrush(canvas);
    brush.color = "#000000";
    brush.width = 5;
    canvas.freeDrawingBrush = brush;

    return canvas;
  } catch (e) {
    console.error("Failed to load fabric", e);
    return null;
  }
};

export const centerCanvas = (canvas: Canvas) => {
  if (!canvas || !canvas.wrapperEl) return;

  const canvasWrapper = canvas.wrapperEl;

  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = "absolute";
  canvasWrapper.style.top = "50%";
  canvasWrapper.style.left = "50%";
  canvasWrapper.style.transform = "translate(-50%, -50%)";
};

export const addShapeToCanvas = async (canvas: Canvas, shapeType: string, customProps = {}) => {
  if (!canvas) return null;
  try {
    const fabricModule = await import("fabric");

    const shape = createShape(fabricModule, shapeType, shapeDefinitions, {
      left: 100,
      top: 100,
      ...customProps,
    });

    if (shape) {
      //   shape.id = `${shapeType}-${Date.now()}`;
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
      return shape;
    }
  } catch (e) {
    console.error("Error adding shape to canvas", e);
  }
};

export const addTextToCanvas = async (
  canvas: Canvas,
  text: string,
  options = {},
  withBackground = false
) => {
  if (!canvas) return null;

  try {
    const { IText } = await import("fabric");

    const defaultProps = {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: "Arial",
      fill: "#000000",
      padding: withBackground ? 10 : 0,
      textAlign: "left",
      id: `text-${Date.now()}`,
    };

    const textObj = new IText(text, {
      ...defaultProps,
      ...options,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    return textObj;
  } catch (e) {
    return null;
  }
};

export const addImageToCanvas = async (canvas: Canvas, imageUrl: string) => {
  if (!canvas) return null;

  try {
    const { Image: FabricImage } = await import("fabric");

    const imgObj = new Image();
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = imageUrl;

    return new Promise((resolve, reject) => {
      imgObj.onload = () => {
        const image = new FabricImage(imgObj);
        image.set({
          id: `image-${Date.now()}`,
          top: 100,
          left: 100,
          padding: 10,
          cornorSize: 10,
        });

        const maxDimension = 400;

        if (image.width > maxDimension || image.height > maxDimension) {
          if (image.width > image.height) {
            const scale = maxDimension / image.width;
            image.scale(scale);
          } else {
            const scale = maxDimension / image.height;
            image.scale(scale);
          }
        }

        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.renderAll();
        resolve(image);
      };

      imgObj.onerror = () => {
        reject(new Error(`Failed to load image: ${imageUrl}`));
      };
    });
  } catch (error) {
    console.error("Error adding image");

    return null;
  }
};

export const toggleDrawingMode = (
  canvas: Canvas,
  isDrawingMode: boolean,
  drawingColor = "#000000",
  brushWidth = 5
) => {
  if (!canvas) return null;

  try {
    canvas.isDrawingMode = isDrawingMode;
    if (isDrawingMode) {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColor;
        canvas.freeDrawingBrush.width = brushWidth;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const toggleEraseMode = (
  canvas: Canvas,
  isErasing: boolean,
  previousColor = "#000000",
  eraserWidth = 20
) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    if (isErasing) {
      canvas.freeDrawingBrush.color = "#ffffff";
      canvas.freeDrawingBrush.width = eraserWidth;
    } else {
      canvas.freeDrawingBrush.color = previousColor;
      canvas.freeDrawingBrush.width = 5;
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const updateDrawingBrush = (canvas: Canvas, properties = {}) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    const { color, width, opacity } = properties as any;
    if (color !== undefined) {
      canvas.freeDrawingBrush.color = color;
    }

    if (width !== undefined) {
      canvas.freeDrawingBrush.width = width;
    }

    if (opacity !== undefined) {
      console.warn("Opacity is not a valid property for BaseBrush and will be ignored.");
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const cloneSelectedObject = async (canvas: Canvas) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;

  try {
    const clonedObj = await activeObject.clone();

    clonedObj.set({
      left: activeObject.left + 10,
      top: activeObject.top + 10,
      id: `${activeObject.type || "object"}-${Date.now()}`,
    });

    canvas.add(clonedObj);
    canvas.renderAll();

    return clonedObj;
  } catch (e) {
    console.error("Error while cloning", e);

    return null;
  }
};

export const deletedSelectedObject = async (canvas: Canvas | null) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();

  if (!activeObject) return;

  try {
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.renderAll();

    return true;
  } catch (e) {
    console.error("Error while deleting", e);
    return false;
  }
};

export const canvasSelectionCustomizeOptions = {
  borderColor: "#8309d6",
  cornerColor: "#af53ed",
  cornerStrokeColor: "#8309d6",
  cornerSize: 10,
  cornerStyle: "circle",
  padding: 1,
  transparentCorners: false,
  setControlVisible: "onhover",
};


export const customizeBoundingBox = (canvas: Canvas) => {
  if (!canvas) return;

  try {
    canvas.on("object:added", (e) => {
      if (e.target) {
        const object = e.target;
        object.set({ ...canvasSelectionCustomizeOptions });
      }
    });

    canvas.getObjects().forEach((obj) => {
      obj.set({ ...canvasSelectionCustomizeOptions });
    });

    canvas.renderAll();
  } catch (e) {
    console.error("Failed to customise bounding box", e);
  }
};
