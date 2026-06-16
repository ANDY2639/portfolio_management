import { Controller } from "@nestjs/common";
import { certificationsContract } from "@portfolio/contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { CertificationsService } from "./certifications.service";

@Controller()
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @TsRestHandler(certificationsContract.listCertifications)
  async listCertifications() {
    return tsRestHandler(certificationsContract.listCertifications, async () => {
      const certifications = await this.certificationsService.listCertifications();
      return { status: 200 as const, body: certifications };
    });
  }
}
