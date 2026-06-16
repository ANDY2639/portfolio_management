import { initContract } from "@ts-rest/core";
import { ErrorDtoSchema } from "../schemas/common.schema.js";
import { ProfileSchema } from "../schemas/profile.schema.js";

const c = initContract();

export const profileContract = c.router({
  getProfile: {
    method: "GET",
    path: "/profile",
    responses: {
      200: ProfileSchema,
      404: ErrorDtoSchema,
      500: ErrorDtoSchema,
    },
    summary: "Get the published portfolio profile (single row)",
  },
});
