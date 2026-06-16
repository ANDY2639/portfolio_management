import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  long_description: z.string().nullable(),
  technologies: z.array(z.string()),
  tags: z.array(z.string()),
  github_url: z.string().url().nullable(),
  live_url: z.string().url().nullable(),
  image_url: z.string().url().nullable(),
  featured: z.boolean(),
  sort_order: z.number().int().min(0),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export type ProjectDto = z.infer<typeof ProjectSchema>;
