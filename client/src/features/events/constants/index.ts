import { TOrientation } from "../types";

export * from "./shapes-elements";
export * from "./text-templates";

export const MAX_ZOOM_LABEL = 200;
export const MIN_ZOOM_LABEL = 25;
export const DEFAULT_ZOOM_LABEL = 100;
export const ZOOM_STEP = 5;

export const DEFAULT_BACKGROUND_COLOR = "#ffffff";
export const DEFAULT_BORDER_COLOR = "#000000";

export const Orientation = ["Landscape", "Portrait"] as const;
export const INIITIAL_CANVAS_ORIENTATION: TOrientation = "Landscape";

export const ExportFormat = ["png", "jpeg", "json"] as const;

export const CANVAS_PRESETS = [
  {
    id: "portrait-4x6",
    name: "4 × 6 in",
    type: "Portrait",
    width: 4,
    height: 6,
    label: "4 × 6 in",
  },
  {
    id: "portrait-5x7",
    name: "5 × 7 in",
    type: "Portrait",
    width: 5,
    height: 7,
    label: "5 × 7 in",
  },
  {
    id: "portrait-6x8",
    name: "6 × 8 in",
    type: "Portrait",
    width: 6,
    height: 8,
    label: "6 × 8 in",
  },
  {
    id: "portrait-a4",
    name: "A4",
    type: "Portrait",
    width: 8.27,
    height: 11.69,
    label: "A4",
  },
  {
    id: "portrait-a5",
    name: "A5",
    type: "Portrait",
    width: 5.83,
    height: 8.27,
    label: "A5",
  },
  {
    id: "landscape-4x6",
    name: "6 × 4 in",
    type: "Landscape",
    width: 6,
    height: 4,
    label: "6 × 4 in",
  },
  {
    id: "landscape-5x7",
    name: "7 × 5 in",
    type: "Landscape",
    width: 7,
    height: 5,
    label: "7 × 5 in",
  },
  {
    id: "landscape-6x8",
    name: "8 × 6 in",
    type: "Landscape",
    width: 8,
    height: 6,
    label: "8 × 6 in",
  },
  {
    id: "landscape-a4",
    name: "A4 Landscape",
    type: "Landscape",
    width: 11.69,
    height: 8.27,
    label: "A4 Landscape",
  },
  {
    id: "landscape-a5",
    name: "A5 Landscape",
    type: "Landscape",
    width: 8.27,
    height: 5.83,
    label: "A5 Landscape",
  },
] as const;
