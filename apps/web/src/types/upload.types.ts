import { Image } from "./image.types";

export interface Upload {
  id: string;
  imageId: string;
  createdAt: Date;
  updatedAt: Date;
  image: Image;
}
