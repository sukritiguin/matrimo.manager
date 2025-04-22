import { shapeDefinitions, shapeTypes } from "@/editor/fabric/shapes/shape-definitions";
import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { addShapeToCanvas } from "@/editor/fabric/fabric-utils";
import { useEditorStore } from "@/editor/store/useEditorStore";
import {  PanelWrapper } from "./PanelWrapper";

const ElementsPanel = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { canvas } = useEditorStore();

  const canvasElementsRef = useRef<Record<(typeof shapeTypes)[number], HTMLCanvasElement | null>>(
    Object.fromEntries(shapeTypes.map((type) => [type, null])) as Record<
      (typeof shapeTypes)[number],
      HTMLCanvasElement | null
    >
  );

  const miniCanvasRef = useRef<
    Record<(typeof shapeTypes)[number], fabric.StaticCanvas | undefined>
  >({});

  useEffect(() => {
    if (isInitialized) return;

    const initElementsCanvas = () => {
      for (const shapeType of shapeTypes) {
        const canvasEl = canvasElementsRef.current[shapeType];
        if (!canvasEl) continue;

        const canvas = new fabric.StaticCanvas(canvasEl, {
          width: 100,
          height: 100,
          preserveObjectStacking: true,
          renderOnAddRemove: true,
          backgroundColor: "transparent",
          selection: false,
        });

        miniCanvasRef.current[shapeType] = canvas;

        const definition = shapeDefinitions[shapeType];
        definition.thumbnail(fabric, canvas);
        canvas.renderAll();
      }

      setIsInitialized(true);
    };

    const timer = setTimeout(initElementsCanvas, 100);
    return () => clearTimeout(timer);
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      for (const canvas of Object.values(miniCanvasRef.current)) {
        canvas?.dispose();
      }
    };
  }, []);

  const setCanvasRef = (el: HTMLCanvasElement | null, shapeType: (typeof shapeTypes)[number]) => {
    canvasElementsRef.current[shapeType] = el;
  };

  const handleClickShape = async (shapeType: (typeof shapeTypes)[number]) => {
    addShapeToCanvas(canvas!, shapeType);
  };

  return (
    <PanelWrapper>
      {shapeTypes.map((shapeType) => (
        <motion.div
          key={shapeType}
          className="flex flex-col items-center justify-center aspect-square w-full rounded-md"
          onClick={() => handleClickShape(shapeType)}
        >
          <canvas
            ref={(el) => setCanvasRef(el, shapeType)}
            width={100}
            height={100}
            className="w-full h-full m-2 bg-transparent"
          />
          <span className="sr-only">{shapeType}</span>
        </motion.div>
      ))}
    </PanelWrapper>
  );
};

export default ElementsPanel;
