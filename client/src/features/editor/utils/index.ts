import {
  CANVAS_PRESETS,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BORDER_COLOR,
} from "../constants";
import { TOrientation } from "../types";
import * as fabric from "fabric";

export function getCanvasPresets(orientation: TOrientation) {
  return CANVAS_PRESETS.filter((preset) => preset.type === orientation);
}

export const FABRIC_RECTANGLE: fabric.Rect = new fabric.Rect({
  width: 100,
  height: 100,
  fill: DEFAULT_BACKGROUND_COLOR,
  stroke: "#000",
  transparentCorners: false,
  hasBorders: true,
  borderColor: "#000",
});

export const FABRIC_TEXTBOX = (text: string): fabric.Textbox => {
  return new fabric.Textbox(text, {
    width: 200,
    height: 100,
    fontSize: 24,
    fill: "#333",
    fontFamily: "Helvetica",
    left: 50,
    top: 50,
  });
};

export const Fabric_TRIANGLE: fabric.Triangle = new fabric.Triangle({
  width: 100,
  height: 100,
  fill: DEFAULT_BACKGROUND_COLOR,
  left: 150,
  top: 150,
  originX: "center",
  originY: "center",
  stroke: DEFAULT_BORDER_COLOR,
});

export const Fabric_CIRCLE: fabric.Circle = new fabric.Circle({
  radius: 50,
  fill: DEFAULT_BACKGROUND_COLOR,
  stroke: DEFAULT_BORDER_COLOR,
  left: 300,
  top: 200,
});
