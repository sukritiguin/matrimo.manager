import z from "zod";
import { requiredString } from "./common.js";
import { createCanvasSchema } from "./canvas.schema.js";

export const EVENT_CATEGORIES = [
  "Wedding",
  "Birthday",
  "Anniversary",
  "Rice Ceremony",
  "Other",
] as const;

const CategorySchema = z
  .object({
    type: z.enum(EVENT_CATEGORIES),
    other: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    type: data.type.toUpperCase(),
  }))
  .refine((data) => (data.type === "OTHER" ? !!data.other : true), {
    message: "Other category must have a description",
  });

const createEventSchema = z.object({
  title: requiredString("Title")
    .max(100, "Title is too long")
    .optional()
    .default("Untitled Event"),
  description: z.string().optional(),
  tags: z
    .array(
      requiredString("Tag").min(3, "Tag must be at least 3 characters long")
    )
    .optional(),
  category: CategorySchema,
  canvas: createCanvasSchema.optional(),
});

const updateEventSchema = createEventSchema.partial();

export { createEventSchema, updateEventSchema };

export type CreateEventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
