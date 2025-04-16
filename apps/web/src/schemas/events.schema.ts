import z from "zod";
import { requiredString } from "./common.js";
import { createCanvasSchema } from "./canvas.schema.js";
import { CANVAS_PRESETS } from "@/lib/constants.js";

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
    path: ["other"],
  });

const createEventSchema = z
  .object({
    dimension: z.enum(
      CANVAS_PRESETS.map((preset) => preset.id) as [string, ...string[]]
    ),
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
  })
  .transform((data) => ({
    ...data,
    width: CANVAS_PRESETS.find((preset) => preset.id === data.dimension)?.width,
    height: CANVAS_PRESETS.find((preset) => preset.id === data.dimension)
      ?.height,
  }))
  .transform((data) => ({
    ...data,
    canvas: {
      ...data.canvas,
      title: data.title,
      width: data.width,
      height: data.height,
    },
  }));

// const updateEventSchema = createEventSchema.partial();

export { createEventSchema };

export type CreateEventSchema = z.infer<typeof createEventSchema>;
// export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
