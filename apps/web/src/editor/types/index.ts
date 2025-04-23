import { FabricImage, FabricObject, FabricText, Group, IText } from "fabric";

export type IFabricObject = FabricObject | (Group | FabricImage | FabricText | IText);
