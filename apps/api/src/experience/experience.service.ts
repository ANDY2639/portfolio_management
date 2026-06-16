import { Injectable } from "@nestjs/common";
import type { ExperienceDto } from "@portfolio/contracts";
import { experienceMock } from "../contracts/mock-data";

@Injectable()
export class ExperienceService {
  async listExperience(): Promise<ExperienceDto[]> {
    return experienceMock;
  }
}
