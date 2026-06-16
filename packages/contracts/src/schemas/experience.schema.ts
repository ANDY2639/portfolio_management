import { z } from "zod";
import { ISO_DATE_REGEX } from "./common.schema.js";

// achievements is jsonb in SQL, treated as string[] per schema comments
export const ExperienceSchema = z.object({
  id: z.string().uuid(),
  company: z.string().min(1),
  position: z.string().min(1),
  description: z.string(),
  achievements: z.array(z.string()),
  start_date: z.string().regex(ISO_DATE_REGEX),
  end_date: z.string().regex(ISO_DATE_REGEX).nullable(),
  location: z.string(),
  employment_type: z.string(),
  sort_order: z.number().int().min(0),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export type ExperienceDto = z.infer<typeof ExperienceSchema>;
