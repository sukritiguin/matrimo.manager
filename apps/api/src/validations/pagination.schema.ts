import { z } from "zod";

const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  orderBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
  category: z.string().optional(),
  tags: z.string().optional(),
});

export { paginationSchema };
