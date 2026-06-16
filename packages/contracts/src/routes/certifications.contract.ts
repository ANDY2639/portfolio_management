import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorDtoSchema } from "../schemas/common.schema.js";
import { CertificationSchema } from "../schemas/certification.schema.js";

const c = initContract();

export const certificationsContract = c.router({
  listCertifications: {
    method: "GET",
    path: "/certifications",
    responses: {
      200: z.array(CertificationSchema),
      500: ErrorDtoSchema,
    },
    summary: "List published certifications, ordered by sort_order ASC",
  },
});
