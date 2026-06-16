import { Injectable } from "@nestjs/common";
import type { CertificationDto } from "@portfolio/contracts";
import { certificationsMock } from "../contracts/mock-data";

@Injectable()
export class CertificationsService {
  async listCertifications(): Promise<CertificationDto[]> {
    return certificationsMock;
  }
}
