import * as z from "zod";
import { requiredNumber, requiredString } from "./common.js";

const createCanvasSchema = z.object({
  title: requiredString("Canvas title")
    .max(100, "Title is too long")
    .optional()
    .default("Untitled"),
  width: requiredNumber("Canvas width"),
  height: requiredNumber("Canvas height"),
  canvasData: z.object({}).or(z.string()).optional(),
});

const updateCanvasSchema = createCanvasSchema.partial();

export { createCanvasSchema, updateCanvasSchema };

export type CreateCanvasSchema = z.infer<typeof createCanvasSchema>;
export type UpdateCanvasSchema = z.infer<typeof updateCanvasSchema>;
