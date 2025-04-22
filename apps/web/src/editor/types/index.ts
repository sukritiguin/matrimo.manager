import { FabricImage, FabricObject, FabricText, Group, IText } from "fabric";

export type IFabricObject = FabricObject &
  (Partial<Group> | Partial<FabricImage> | Partial<FabricText> | Partial<IText>);
