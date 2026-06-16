import { Controller } from "@nestjs/common";
import { educationContract } from "@portfolio/contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { EducationService } from "./education.service";

@Controller()
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @TsRestHandler(educationContract.listEducation)
  async listEducation() {
    return tsRestHandler(educationContract.listEducation, async () => {
      const education = await this.educationService.listEducation();
      return { status: 200 as const, body: education };
    });
  }
}
