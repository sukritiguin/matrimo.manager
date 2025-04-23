import React, { useEffect, useRef, useState } from "react";
import { useEditorData } from "../hooks/useEditorData";
import { canvasSelectionCustomizeOptions, initializeFabric } from "../fabric/fabric-utils";
import { useEditorStore } from "../store/useEditorStore";
import { useObjectProperties } from "../store/usePropertiesStore";
import { ObjectCursor } from "./properties/ObjectCursor";
import { DISABLED_CONTROLS } from "../fabric/controlsUtils";
import { ModifiedEvent, TPointerEvent } from "fabric";

const MainCanvas = () => {
  const {
    data: {
      canvas: { width, height },
    },
  } = useEditorData();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas, setShowPropertiesPanel } = useEditorStore();
  const {
    setSelectedObject,
    setIsSelectedObjectMoving,
    reset: resetProperties,
    onKeyDown,
  } = useObjectProperties();

  const [contextPosition, setContextPosition] = useState<{ x: number; y: number } | null>(null);

  //   Initialize canvas
  useEffect(() => {
    async function initCanvas() {
      try {
        if (!canvasRef.current) throw new Error("Canvas not found");

        if (!width || !height) throw new Error("Canvas dimensions not found");

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
    if (!canvas) return;

    const handleObjectModifid = (data: ModifiedEvent<TPointerEvent>) => {};

    const handleClickContextMenu = (data: any) => {
      console.log(data);
      const event = data.e as PointerEvent;
      data.e.preventDefault();
      setContextPosition({ x: event.offsetX, y: event.offsetY });
    };

    const handleObjectMoving = () => {
      const selectedObject = canvas.getActiveObject();
      if (selectedObject) {
        setIsSelectedObjectMoving(true);
      }
    };

    const close = () => {
      setTimeout(() => {
        setIsSelectedObjectMoving(false);
      }, 500);
    };

    canvas.on("contextmenu", handleClickContextMenu);
    canvas.on("object:modified", handleObjectModifid);
    canvas.on("object:moving", handleObjectMoving);
    canvas.on("object:modified", close);

    return () => {
      canvas.off("contextmenu", handleClickContextMenu);
      canvas.off("object:modified", handleObjectModifid);
      canvas.off("object:moving", handleObjectMoving);
      canvas.off("object:modified", close);
    };
  }, [canvas, setIsSelectedObjectMoving]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // Selection customization
  useEffect(() => {
    if (!canvas) return;

    const handleSelection = () => {
      const activeSelection = canvas.getActiveObject();

      if (activeSelection) {
        console.log(activeSelection);
        setShowPropertiesPanel(true);
        setSelectedObject(activeSelection as any);

        DISABLED_CONTROLS.forEach((control) => {
          activeSelection.controls[control].visible = false;
        });

        activeSelection.set({
          ...activeSelection,
          ...canvasSelectionCustomizeOptions,
        });

        activeSelection.setCoords();
        canvas.renderAll();
      }
    };

    const handleDeselection = () => {
      setShowPropertiesPanel(false);
      resetProperties();
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", handleDeselection);

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", handleDeselection);
    };
  }, [canvas, resetProperties, setShowPropertiesPanel, setSelectedObject]);

  useEffect(() => {
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  return (
    <React.Fragment>
      <div style={{ width, height }} className="absolute">
        <ObjectCursor />
      </div>
      <div style={{ width, height }} className="relative ring-1 ring-purple-500 ring-offset-2">
        <canvas ref={canvasRef} />
      </div>
    </React.Fragment>
  );
};

export default MainCanvas;
