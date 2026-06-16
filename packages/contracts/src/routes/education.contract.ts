import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorDtoSchema } from "../schemas/common.schema.js";
import { EducationSchema } from "../schemas/education.schema.js";

const c = initContract();

export const educationContract = c.router({
  listEducation: {
    method: "GET",
    path: "/education",
    responses: {
      200: z.array(EducationSchema),
      500: ErrorDtoSchema,
    },
    summary: "List published education entries, ordered by sort_order ASC",
  },
});
