import { z } from "zod";

// SQL has no CHECK constraint on skills.category — source: portfolio_full.sql
export const SkillCategorySchema = z.enum(["frontend", "backend", "tools", "soft"]);

export const SkillSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  category: SkillCategorySchema,
  level: z.number().int().min(1).max(5),
  icon: z.string().nullable(),
  highlight: z.boolean(),
  sort_order: z.number().int().min(0),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export const SkillsQuerySchema = z.object({
  category: SkillCategorySchema.optional(),
  highlight: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .pipe(z.boolean())
    .optional(),
});

export type SkillDto = z.infer<typeof SkillSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SkillsQuery = z.infer<typeof SkillsQuerySchema>;
