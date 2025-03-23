import { z } from "zod";

export const createEditorSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title is to long")
    .default("Untitled"),
  content: z.string({ required_error: "Content is required" }).optional(),
  tags: z.array(z.string().min(3, "Tag must be at least 3 characters long")).optional(),
  data: z.record(z.any()),
});

export const updateEditorSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is to long").optional(),
  content: z.string().optional(),
  tags: z.array(z.string().min(3, "Tag is to short")).optional(),
  data: z.record(z.any()),
});

export const renameEditorSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is to long"),
});

export const toggleArchiveSchema = z.object({
  isArchive: z.boolean().default(false),
});

export const uploadFileSchema = z.object({
  file: z.any(),
});

export type CreateEditorSchema = z.infer<typeof createEditorSchema>;
export type UpdateEditorSchema = z.infer<typeof updateEditorSchema>;
export type RenameEditorSchema = z.infer<typeof renameEditorSchema>;
export type ToggleArchiveSchema = z.infer<typeof toggleArchiveSchema>;
export type UploadFileSchema = z.infer<typeof uploadFileSchema>;
