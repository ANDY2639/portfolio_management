import { Module } from "@nestjs/common";
import { CertificationsModule } from "./certifications/certifications.module";
import { ContractsModule } from "./contracts/contracts.module";
import { EducationModule } from "./education/education.module";
import { ExperienceModule } from "./experience/experience.module";
import { ProfileModule } from "./profile/profile.module";
import { ProjectsModule } from "./projects/projects.module";
import { SkillsModule } from "./skills/skills.module";

@Module({
  imports: [
    ContractsModule,
    ProfileModule,
    SkillsModule,
    ExperienceModule,
    EducationModule,
    CertificationsModule,
    ProjectsModule,
  ],
})
export class AppModule {}
