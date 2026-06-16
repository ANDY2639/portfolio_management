import { Controller } from "@nestjs/common";
import { experienceContract } from "@portfolio/contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { ExperienceService } from "./experience.service";

@Controller()
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @TsRestHandler(experienceContract.listExperience)
  async listExperience() {
    return tsRestHandler(experienceContract.listExperience, async () => {
      const experience = await this.experienceService.listExperience();
      return { status: 200 as const, body: experience };
    });
  }
}
