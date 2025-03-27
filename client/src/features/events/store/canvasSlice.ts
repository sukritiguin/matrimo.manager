import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCanvasPresets } from "../utils";
import { TCanvasPreset, TOrientation } from "../types";
import {
  DEFAULT_ZOOM_LABEL,
  ExportFormat,
  INIITIAL_CANVAS_ORIENTATION,
  MAX_ZOOM_LABEL,
  MIN_ZOOM_LABEL,
  ZOOM_STEP,
} from "../constants";

interface EditorState {
  zoomLevel: number;
  orientation: TOrientation;
  canvasPresets: TCanvasPreset[];
  selectedCanvasPreset: TCanvasPreset;
  //   history: CirCulerStack<fabric.Object[]>;
}

const initialState: EditorState = {
  zoomLevel: DEFAULT_ZOOM_LABEL,
  orientation: INIITIAL_CANVAS_ORIENTATION,
  selectedCanvasPreset: getCanvasPresets(INIITIAL_CANVAS_ORIENTATION)[0],
  canvasPresets: getCanvasPresets(INIITIAL_CANVAS_ORIENTATION),
  //   history: new CirCulerStack<fabric.Object[]>(24),
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    updateCanvasStoreState: (state, action: PayloadAction<Partial<EditorState>>) => {
      state = { ...state, ...action.payload };
      return state;
    },

    setZoomLevel: (state, action: PayloadAction<{ zoom: number }>) => {
      state.zoomLevel = Math.min(MAX_ZOOM_LABEL, Math.max(MIN_ZOOM_LABEL, action.payload.zoom));
    },

    onChangeZoom: (state, action: PayloadAction<{ value: "in" | "out" | number }>) => {
      let newZoomLevel: number;
      if (typeof action.payload === "number") {
        newZoomLevel = action.payload;
      } else {
        newZoomLevel = state.zoomLevel + (action.payload.value === "in" ? ZOOM_STEP : -ZOOM_STEP);
      }

      newZoomLevel = Math.min(Math.max(newZoomLevel, MIN_ZOOM_LABEL), MAX_ZOOM_LABEL);
      state.zoomLevel = newZoomLevel;
    },

    onZoomReset: (state) => {
      state.zoomLevel = DEFAULT_ZOOM_LABEL;
    },

    toggleOrientation: (state) => {
      console.log("Toggle orientation");

      const newOrientation: TOrientation =
        state.orientation === "Landscape" ? "Portrait" : "Landscape";
      const newCanvasPresets = getCanvasPresets(newOrientation);
      const newSelectedPreset =
        newCanvasPresets.find(
          (preset) =>
            state.selectedCanvasPreset.id.replace(
              state.orientation.toLowerCase(),
              newOrientation.toLowerCase()
            ) === preset.id
        ) || newCanvasPresets[0];

      state.orientation = newOrientation;
      state.canvasPresets = newCanvasPresets;
      state.selectedCanvasPreset = newSelectedPreset;
    },

    onChnageCanvasPreset: (state, action: PayloadAction<{ id: string }>) => {
      const presetId = action.payload.id as TCanvasPreset["id"];

      const newSelectedCanvasPreset = state.canvasPresets.find((preset) => preset.id === presetId);
      if (newSelectedCanvasPreset) {
        state.selectedCanvasPreset = newSelectedCanvasPreset;
      } else {
        console.error(`Canvas preset with id "${presetId}" not found`);
      }
    },

    exportCanvas: (state, action: PayloadAction<(typeof ExportFormat)[number]>) => {},

    // undo: (state) => {},

    // redo: (state) => {},

    reset: () => initialState,
  },
});

export const {
  updateCanvasStoreState,
  setZoomLevel,
  onChangeZoom,
  onZoomReset,
  toggleOrientation,
  onChnageCanvasPreset,
  exportCanvas,
  //   undo,
  //   redo,
  reset,
} = canvasSlice.actions;

export default canvasSlice.reducer;
