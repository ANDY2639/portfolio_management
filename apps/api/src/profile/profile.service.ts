import { Injectable } from "@nestjs/common";
import type { ProfileDto } from "@portfolio/contracts";
import { profileMock } from "../contracts/mock-data";

@Injectable()
export class ProfileService {
  async getProfile(): Promise<ProfileDto | null> {
    return profileMock;
  }
}
