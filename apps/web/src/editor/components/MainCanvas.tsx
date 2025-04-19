import { useEffect, useRef } from "react";
import { useEditorData } from "../hooks/useEditorData";
import { canvasSelectionCustomizeOptions, initializeFabric } from "../fabric/fabric-utils";
import { useEditorStore } from "../store/useEditorStore";
import { handleKeyDownInCanvas } from "../fabric/key-events";
import { debounce } from "@/lib/utils";

const MainCanvas = () => {
  const {
    data: {
      canvas: { width, height },
    },
  } = useEditorData();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas, setShowPropertiesPanel } = useEditorStore();

  useEffect(() => {
    async function initCanvas() {
      try {
        if (!canvasRef.current) {
          throw new Error("Canvas not found");
        }
        if (!width || !height) {
          throw new Error("Canvas dimensions not found");
        }

        const canvas = await initializeFabric(canvasRef.current);
        if (!canvas) throw new Error("Canvas not initialized");

        canvas.setDimensions({ width, height });
        canvas.set({ backgroundColor: "#FFFFFF" });
        canvas.renderAll();

        setCanvas(canvas);
        console.log("Canvas initialized");
      } catch (error) {
        console.error(error);
      }
    }

    const timer = setTimeout(() => {
      initCanvas();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const debouncedHandler = debounce((e: KeyboardEvent) => {
      handleKeyDownInCanvas(canvas, e);
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      debouncedHandler(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canvas]);

  // Selection customization
  useEffect(() => {
    if (!canvas) return;

    const handleSelection = () => {
      const activeSelection = canvas.getActiveObject();
      setShowPropertiesPanel(!!activeSelection);
      if (activeSelection) {
        activeSelection.set({ ...canvasSelectionCustomizeOptions });
      }
    };

    const handleDeselection = () => {
        setShowPropertiesPanel(false);
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", handleDeselection);

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", handleDeselection);
    };
  }, [canvas]);

  useEffect(() => {
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  return (
    <div style={{ width, height }} className="relative ring-1 ring-purple-500 ring-offset-2">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MainCanvas;
