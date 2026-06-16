import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  location: z.string(),
  avatar_url: z.string().url(),
  cv_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  linkedin_url: z.string().url().nullable(),
  website_url: z.string().url().nullable(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export type ProfileDto = z.infer<typeof ProfileSchema>;
