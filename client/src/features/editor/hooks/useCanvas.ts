import {
  CANVAS_PRESETS,
  DEFAULT_BACKGROUND_COLOR,
  MAX_ZOOM_LABEL,
  MIN_ZOOM_LABEL,
  ZOOM_STEP,
} from "../constants";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { useCanvasContext } from "./useCanvasContext";
import { onChnageCanvasPreset, setZoomLevel, updateCanvasStoreState } from "../stores/canvasSlice";
import { useColorPicker } from "@/hooks/useColorPicker";
import { TOrientation } from "../types";

export const useCanvas = () => {
  const dispatch = useAppDispatch();

  const { canvas, canvasContainerRef, canvasRef } = useCanvasContext();
  const { selectedCanvasPreset, zoomLevel, orientation, canvasPresets } = useAppSelector(
    (state) => state.canvas
  );

  const backgroundColorPicker = useColorPicker(DEFAULT_BACKGROUND_COLOR, (color: string) => {
    if (canvas) {
      canvas.backgroundColor = color;
      canvas.requestRenderAll();
    }
  });

  const handleZoom = (value: "in" | "out" | number) => {
    try {
      if (!canvas || !canvasContainerRef) {
        throw new Error("Canvas not initialized.");
      }

      let newZoomLevel: number;
      if (typeof value === "number") {
        newZoomLevel = value;
      } else if (value === "in" || value === "out") {
        const factor = value === "in" ? ZOOM_STEP : -ZOOM_STEP;

        newZoomLevel = zoomLevel + factor;
      } else {
        throw new Error("Invalid zoom level");
      }

      newZoomLevel = Math.min(Math.max(newZoomLevel, MIN_ZOOM_LABEL), MAX_ZOOM_LABEL);

      dispatch(setZoomLevel({ zoom: newZoomLevel }));

      canvas.setZoom(newZoomLevel / 100);
      canvas.renderAll();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const onToggleOrientation = () => {
    if (!canvas || !canvasContainerRef.current) return;

    const newOrientation: TOrientation = orientation === "Landscape" ? "Portrait" : "Landscape";
    const newCanvasPresets = CANVAS_PRESETS.filter((preset) => preset.type === newOrientation);
    const newSelectedPreset =
      newCanvasPresets.find(
        (preset) =>
          selectedCanvasPreset.id.replace(
            orientation.toLowerCase(),
            newOrientation.toLowerCase()
          ) === preset.id
      ) || newCanvasPresets[0];

    dispatch(
      updateCanvasStoreState({
        canvasPresets: newCanvasPresets,
        selectedCanvasPreset: newSelectedPreset,
        orientation: newOrientation,
      })
    );

    canvasContainerRef.current.style.width = `${newSelectedPreset.width * 96}px`;
    canvasContainerRef.current.style.height = `${newSelectedPreset.height * 96}px`;
    canvas.setDimensions({
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    });

    canvas.setZoom(zoomLevel / 100);
    canvas.renderAll();
  };

  const changeCanvasPreset = (id: string) => {
    if (!canvas || !canvasContainerRef.current) return;
    dispatch(onChnageCanvasPreset({ id }));

    const newPreset = canvasPresets.find((preset) => preset.id === id);
    if (newPreset) {
      canvasContainerRef.current.style.width = `${newPreset.width * 96}px`;
      canvasContainerRef.current.style.height = `${newPreset.height * 96}px`;
      canvas.setDimensions({
        width: canvasContainerRef.current.offsetWidth,
        height: canvasContainerRef.current.offsetHeight,
      });
      canvas.setZoom(zoomLevel / 100);
      canvas.renderAll();
    }
  };

  return {
    canvasRef,
    canvasContainerRef,
    canvas,
    zoomLevel,
    handleZoom,
    orientation,
    canvasPresets,
    selectedCanvasPreset,
    onToggleOrientation,
    changeCanvasPreset,
    backgroundColorPicker,
  };
};
