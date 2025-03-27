import { useCallback, useEffect } from "react";
import { createReactContext } from "@/lib/createReactContext";
import { useEditorCanvas } from "../hooks/useEditorCanvas";

export const EditorCanvasKeyEvent = createReactContext(() => {
  const { canvas } = useEditorCanvas();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!canvas) return;

      // Handle object deletion
      if (event.key === "Delete") {
        const activeObject = canvas.getActiveObjects();
        if (activeObject.length > 0) {
          activeObject.forEach((obj) => {
            if (event.key === "Delete" && !obj.isType("textbox")) {
              canvas.remove(obj);
            }
          });
          canvas.discardActiveObject();
        }
      }
    },
    [canvas]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
});
