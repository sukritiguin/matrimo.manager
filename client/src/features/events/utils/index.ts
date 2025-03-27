import { CANVAS_PRESETS } from "../constants";
import { TOrientation } from "../types";

export function getCanvasPresets(orientation: TOrientation) {
  return CANVAS_PRESETS.filter((preset) => preset.type === orientation);
}
