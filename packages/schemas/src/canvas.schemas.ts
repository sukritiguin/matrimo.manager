import * as z from "zod";
import { requiredNumber, requiredString } from "./common.js";

const canvasParamsSchema = z.object({
  id: requiredString("Canvas id"),
});

const createCanvasSchema = z.object({
  title: requiredString("Canvas title")
    .max(100, "Title is too long")
    .optional()
    .default("Untitled"),
  width: requiredNumber("Canvas width"),
  height: requiredNumber("Canvas height"),
  canvasData: z.object({}).or(z.string()).optional(),
});

const canvasDataSchema = z.object({}).or(z.string());

const updateCanvasSchema = createCanvasSchema.partial();

export { canvasParamsSchema, createCanvasSchema, updateCanvasSchema, canvasDataSchema };

export type CreateCanvasSchema = z.infer<typeof createCanvasSchema>;
export type UpdateCanvasSchema = z.infer<typeof updateCanvasSchema>;
export type CanvasParamsSchema = z.infer<typeof canvasParamsSchema>;
