import { Injectable } from "@nestjs/common";
import type { EducationDto } from "@portfolio/contracts";
import { educationMock } from "../contracts/mock-data";

@Injectable()
export class EducationService {
  async listEducation(): Promise<EducationDto[]> {
    return educationMock;
  }
}
