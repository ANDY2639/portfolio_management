import { initContract } from "@ts-rest/core";
import { certificationsContract } from "./routes/certifications.contract.js";
import { educationContract } from "./routes/education.contract.js";
import { experienceContract } from "./routes/experience.contract.js";
import { profileContract } from "./routes/profile.contract.js";
import { projectsContract } from "./routes/projects.contract.js";
import { skillsContract } from "./routes/skills.contract.js";

const c = initContract();

export const AppContract = c.router({
  profile: profileContract,
  skills: skillsContract,
  experience: experienceContract,
  education: educationContract,
  certifications: certificationsContract,
  projects: projectsContract,
});

export type AppContractType = typeof AppContract;
