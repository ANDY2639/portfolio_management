import { Controller } from "@nestjs/common";
import { skillsContract } from "@portfolio/contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { SkillsService } from "./skills.service";

@Controller()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @TsRestHandler(skillsContract.listSkills)
  async listSkills() {
    return tsRestHandler(skillsContract.listSkills, async ({ query }) => {
      const skills = await this.skillsService.listSkills(query);
      return { status: 200 as const, body: skills };
    });
  }
}
