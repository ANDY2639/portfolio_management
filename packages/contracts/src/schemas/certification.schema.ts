import { z } from "zod";
import { ISO_DATE_REGEX } from "./common.schema.js";

export const CertificationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  issuer: z.string().min(1),
  issue_date: z.string().regex(ISO_DATE_REGEX),
  expiry_date: z.string().regex(ISO_DATE_REGEX).nullable(),
  credential_id: z.string().nullable(),
  credential_url: z.string().url().nullable(),
  keywords: z.array(z.string()),
  sort_order: z.number().int().min(0),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export type CertificationDto = z.infer<typeof CertificationSchema>;
