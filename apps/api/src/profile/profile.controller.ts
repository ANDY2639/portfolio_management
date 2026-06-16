import { Controller } from "@nestjs/common";
import { profileContract } from "@portfolio/contracts";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { ProfileService } from "./profile.service";

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @TsRestHandler(profileContract.getProfile)
  async getProfile() {
    return tsRestHandler(profileContract.getProfile, async () => {
      const profile = await this.profileService.getProfile();
      if (!profile) {
        return { status: 404 as const, body: { message: "Profile not found", statusCode: 404 } };
      }
      return { status: 200 as const, body: profile };
    });
  }
}
