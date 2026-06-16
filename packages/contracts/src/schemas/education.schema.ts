import { z } from "zod";
import { ISO_DATE_REGEX } from "./common.schema.js";

export const EducationSchema = z.object({
  id: z.string().uuid(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().nullable(),
  description: z.string().nullable(),
  start_date: z.string().regex(ISO_DATE_REGEX).nullable(),
  end_date: z.string().regex(ISO_DATE_REGEX).nullable(),
  sort_order: z.number().int().min(0),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export type EducationDto = z.infer<typeof EducationSchema>;
