import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ErrorDtoSchema } from "../schemas/common.schema.js";
import { ProjectSchema } from "../schemas/project.schema.js";

const c = initContract();

export const projectsContract = c.router({
  listProjects: {
    method: "GET",
    path: "/projects",
    responses: {
      200: z.array(ProjectSchema),
      500: ErrorDtoSchema,
    },
    summary: "List published projects, ordered by sort_order ASC",
  },
});
