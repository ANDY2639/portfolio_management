import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorDtoSchema } from "../schemas/common.schema.js";
import { ExperienceSchema } from "../schemas/experience.schema.js";

const c = initContract();

export const experienceContract = c.router({
  listExperience: {
    method: "GET",
    path: "/experience",
    responses: {
      200: z.array(ExperienceSchema),
      500: ErrorDtoSchema,
    },
    summary: "List published experience entries, ordered by sort_order ASC",
  },
});
