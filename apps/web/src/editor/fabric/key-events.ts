import { Canvas } from "fabric";

export const handleKeyDownInCanvas = (canvas: Canvas | null, e: KeyboardEvent) => {
  try {
    if (!canvas) {
      throw new Error("Canvas not found");
    }

    console.log({
      key: e.key,
      shiftKey: e.shiftKey,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
    });

    if (e.key === "Delete") {
      canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
    }

    // if (e.key === "Backspace") {
    //   e.preventDefault();
    //   canvas.getActiveObjects().forEach((obj) => {
    //     if (obj.type === "i-text" || obj.type === "text") return;
    //     canvas.remove(obj);
    //   });
    //   canvas.discardActiveObject();
    // }

    if (e.key === "Escape") {
      canvas.discardActiveObject();
    }

    if (e.key === "ArrowLeft") {
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ left: obj.left - 8 });
        obj.setCoords();
      });
    }

    if (e.key === "ArrowRight") {
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ left: obj.left + 8 });
        obj.setCoords();
      });
    }

    if (e.key === "ArrowUp") {
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ top: obj.top - 8 });
        obj.setCoords();
      });
    }

    if (e.key === "ArrowDown") {
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ top: obj.top + 8 });
        obj.setCoords();
      });
    }

    canvas.renderAll();
  } catch (error) {
    console.error(error);
  }
};
