import { FabricImage, FabricText, Group, Path } from "fabric";

export function isTextObject(obj: any): obj is FabricText {
  return obj.type === "i-text" || obj.type === "text";
}

export function isImageObject(obj: any): obj is FabricImage {
  return obj.type === "image";
}

export function isPathObject(obj: any): obj is Path {
  return obj.type === "path";
}

export function isGroupObject(obj: any): obj is Group {
  return obj.type === "group";
}

export const colorPresets = [
  "#FFFFFF",
  "#F8F9FA",
  "#E9ECEF",
  "#DEE2E6",
  "#212529",
  "#000000",
  "#E53935",
  "#D81B60",
  "#8E24AA",
  "#5E35B1",
  "#3949AB",
  "#1E88E5",
  "#039BE5",
  "#00ACC1",
  "#00897B",
  "#43A047",
  "#7CB342",
  "#C0CA33",
  "#FFCDD2",
  "#F8BBD0",
  "#E1BEE7",
  "#D1C4E9",
  "#C5CAE9",
  "#BBDEFB",
  "#B3E5FC",
  "#B2EBF2",
  "#B2DFDB",
  "#C8E6C9",
  "#DCEDC8",
  "#F0F4C3",
];
