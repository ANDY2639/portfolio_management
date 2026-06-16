import { Controller } from "@nestjs/common";
import { projectsContract } from "@portfolio/contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { ProjectsService } from "./projects.service";

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @TsRestHandler(projectsContract.listProjects)
  async listProjects() {
    return tsRestHandler(projectsContract.listProjects, async () => {
      const projects = await this.projectsService.listProjects();
      return { status: 200 as const, body: projects };
    });
  }
}
