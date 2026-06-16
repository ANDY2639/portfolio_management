import { Injectable } from "@nestjs/common";
import type { SkillDto, SkillsQuery } from "@portfolio/contracts";
import { skillsMock } from "../contracts/mock-data";

@Injectable()
export class SkillsService {
  async listSkills(query: SkillsQuery): Promise<SkillDto[]> {
    return skillsMock.filter((skill) => {
      if (query.category && skill.category !== query.category) return false;
      if (query.highlight !== undefined && skill.highlight !== query.highlight) return false;
      return true;
    });
  }
}
