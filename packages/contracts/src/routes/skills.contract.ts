import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorDtoSchema } from "../schemas/common.schema.js";
import { SkillSchema, SkillsQuerySchema } from "../schemas/skill.schema.js";

const c = initContract();

export const skillsContract = c.router({
  listSkills: {
    method: "GET",
    path: "/skills",
    query: SkillsQuerySchema,
    responses: {
      200: z.array(SkillSchema),
      500: ErrorDtoSchema,
    },
    summary: "List published skills, ordered by sort_order ASC. Optional filters: category, highlight",
  },
});
