import { create } from "zustand";
import * as fabric from "fabric";
import { getCanvasPresets } from "../utils";
import { TCanvasPreset, TOrientation } from "../types";
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_ZOOM_LABEL,
  ExportFormat,
  INIITIAL_CANVAS_ORIENTATION,
  MAX_ZOOM_LABEL,
  MIN_ZOOM_LABEL,
  ZOOM_STEP,
} from "../constants";

interface State {
  canvas: fabric.Canvas | null;
  canvasContainerRef: HTMLDivElement | null;
  zoomLevel: number;
  orientation: TOrientation;
  canvasPresets: TCanvasPreset[];
  selectedCanvasPreset: TCanvasPreset;
}

interface Actions {
  initCanvas: () => void;
  canvasResize: () => void;
  setCanvas: (canvas: fabric.Canvas) => void;
  setOrientation: (orientation: TOrientation) => void;
  toggleOrientation: () => void;

  changeCanvasPreset: (id: string) => void;
  handleZoom: (value: "in" | "out" | number) => void;
  setZoomLevel: (value: number) => void;
  resetZoom: () => void;

  exportCanvas: (format: (typeof ExportFormat)[number]) => void;

  reset: () => void;
}

const INIITIAL_CANVAS_STORE: State = {
  canvas: null,
  canvasContainerRef: null,
  zoomLevel: DEFAULT_ZOOM_LABEL,
  orientation: INIITIAL_CANVAS_ORIENTATION, // Default orientation
  selectedCanvasPreset: getCanvasPresets(INIITIAL_CANVAS_ORIENTATION)[0],
  canvasPresets: getCanvasPresets(INIITIAL_CANVAS_ORIENTATION),
};

export const useCanvasStore = create<State & Actions>((set, get) => ({
  // Initialize the state with the initial values
  ...INIITIAL_CANVAS_STORE,

  // Initialize the canvas
  initCanvas: () => {
    console.log("Init canvas");
    const {
      selectedCanvasPreset: { width, height },
      zoomLevel,
    } = get();
    try {
      const canvas = new fabric.Canvas("editorCanvas", {
        width: width * 96,
        height: height * 96,
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
        selectionBorderColor: "#00ff",
      });
      canvas.setZoom(zoomLevel / 100);
      const canvasContainerRef = document.getElementById(
        "editorCanvasContainer"
      ) as HTMLDivElement;
      if (!canvasContainerRef) {
        throw new Error("Can not find editor container");
      }

      canvasContainerRef.style.width = `${width * 96}px`;
      canvasContainerRef.style.height = `${height * 96}px`;

      set({ canvas, canvasContainerRef });

      canvas.renderAll();
    } catch (error) {
      console.error("Failed to initialize Fabric canvas", error);
    }
  },

  // Handle canvas resizing
  canvasResize: () => {
    const { canvas, canvasContainerRef, selectedCanvasPreset, zoomLevel } =
      get();
    try {
      if (!canvas) throw new Error("Canvas not initialized");
      if (!canvasContainerRef) throw new Error("Canvas container not found");

      const canvasWidth = selectedCanvasPreset.width * 96;
      const cavasHeight = selectedCanvasPreset.height * 96;

      canvas.setDimensions({ width: canvasWidth, height: cavasHeight });
      canvasContainerRef.style.height = `${cavasHeight}px`;
      canvasContainerRef.style.width = `${canvasWidth}px`;
      canvasContainerRef.style.transform = `scale(${zoomLevel / 100})`;

      canvas.setZoom(zoomLevel / 100);

      canvas.renderAll();
    } catch (error) {
      console.error("Failed to resize Fabric canvas", error);
    }
  },

  setZoomLevel: (value) => {
    const { canvas } = get();
    if (canvas) {
      set({
        zoomLevel: Math.min(MAX_ZOOM_LABEL, Math.max(MIN_ZOOM_LABEL, value)),
      });
    }
  },

  setOrientation: (orientation) => {
    const { canvas } = get();
    if (canvas) {
      set({ orientation });
      console.log(orientation);
    }
  },

  toggleOrientation() {
    console.log("toggle orientation");
    const { orientation, selectedCanvasPreset, canvasResize } = get();
    const toggleOrientation: TOrientation =
      orientation === "Landscape" ? "Portrait" : "Landscape";
    const newCanvasPresets = getCanvasPresets(toggleOrientation);

    const newSelectedCanvasPreser =
      newCanvasPresets.find(
        (preset) =>
          selectedCanvasPreset.id.replace(
            orientation.toLowerCase(),
            toggleOrientation.toLowerCase()
          ) === preset.id
      ) || newCanvasPresets[0];

    set({
      orientation: toggleOrientation,
      canvasPresets: newCanvasPresets,
      selectedCanvasPreset: newSelectedCanvasPreser,
    });

    canvasResize();
  },

  changeCanvasPreset(id) {
    const presetId = id as TCanvasPreset["id"];
    const { canvasPresets, selectedCanvasPreset, canvasResize } = get();

    if (id === "custom") {
      console.log("Custom preset");
    }
    const selectPreset = canvasPresets.find((preset) => preset.id === presetId);
    if (selectPreset) {
      set({ selectedCanvasPreset: selectPreset });
    } else {
      set({ selectedCanvasPreset });
      console.error(`Canvas preset with id ${presetId} not found.`);
    }

    canvasResize();
  },

  handleZoom(value: "in" | "out" | number) {
    const { canvas, zoomLevel, canvasContainerRef } = get();

    if (!canvas || !canvasContainerRef) {
      console.error("Canvas not initialized.");
      return;
    }

    let newZoomLevel: number;
    if (typeof value === "number") {
      newZoomLevel = value;
    } else if (value === "in" || value === "out") {
      const factor = value === "in" ? ZOOM_STEP : -ZOOM_STEP;

      newZoomLevel = zoomLevel + factor;
    } else {
      console.error("Invalid zoom value:", value);
      return;
    }
    newZoomLevel = Math.min(
      Math.max(newZoomLevel, MIN_ZOOM_LABEL),
      MAX_ZOOM_LABEL
    );

    set({ zoomLevel: newZoomLevel });

    get().canvasResize();
  },

  // Reset zoom function
  resetZoom: () => {
    const { canvas } = get();
    if (canvas) {
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      set({ zoomLevel: DEFAULT_ZOOM_LABEL });

      canvas.requestRenderAll();

      get().canvasResize();
    }
  },

  setCanvas: (canvas) => set({ canvas }),

  exportCanvas: (format) => {
    const { canvas } = get();
    if (!canvas) {
      console.error("Canvas is not initialized");
      return;
    }

    if (format === "png") {
      const dataURL = canvas.toDataURL({
        format,
        quality: 1,
        multiplier: 1,
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas.png";
      document.body.appendChild(link);
      link.click();
      console.log("Canvas exported as PNG");
      document.body.removeChild(link);
    }
  },

  reset: () => set(INIITIAL_CANVAS_STORE),
}));
