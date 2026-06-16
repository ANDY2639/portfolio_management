import { Injectable } from "@nestjs/common";
import type { ProjectDto } from "@portfolio/contracts";
import { projectsMock } from "../contracts/mock-data";

@Injectable()
export class ProjectsService {
  async listProjects(): Promise<ProjectDto[]> {
    return projectsMock;
  }
}
