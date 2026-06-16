import { z } from "zod";

export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const ErrorDtoSchema = z.object({
  message: z.string(),
  statusCode: z.number().int(),
});

export type ErrorDto = z.infer<typeof ErrorDtoSchema>;
