import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const contractsDistEntry = resolve(here, "../dist/esm/index.js");
const fixturePath = resolve(here, "../fixtures/supabase-public-sample.json");

async function loadFixture() {
  const raw = await readFile(fixturePath, "utf8");
  return JSON.parse(raw);
}

async function loadContracts() {
  return import(pathToFileURL(contractsDistEntry).href);
}

test("AC-03 runtime import resolves from apps/api, apps/web, apps/admin", () => {
  const appDirs = ["apps/api", "apps/web", "apps/admin"];

  for (const appDir of appDirs) {
    const result = spawnSync(
      process.execPath,
      ["--input-type=module", "--eval", "await import('@portfolio/contracts')"],
      {
        cwd: resolve(root, appDir),
        encoding: "utf8",
      },
    );

    assert.equal(
      result.status,
      0,
      `Import failed in ${appDir}: ${result.stderr || result.stdout}`,
    );
  }
});

test("AC-10 Supabase-like fixture parses with all DTO schemas", async () => {
  const fixture = await loadFixture();
  const {
    ProfileSchema,
    SkillSchema,
    ExperienceSchema,
    EducationSchema,
    CertificationSchema,
    ProjectSchema,
  } = await loadContracts();

  assert.doesNotThrow(() => ProfileSchema.parse(fixture.profile));
  assert.doesNotThrow(() => fixture.skills.forEach((x) => SkillSchema.parse(x)));
  assert.doesNotThrow(() =>
    fixture.experience.forEach((x) => ExperienceSchema.parse(x)),
  );
  assert.doesNotThrow(() => fixture.education.forEach((x) => EducationSchema.parse(x)));
  assert.doesNotThrow(() =>
    fixture.certifications.forEach((x) => CertificationSchema.parse(x)),
  );
  assert.doesNotThrow(() => fixture.projects.forEach((x) => ProjectSchema.parse(x)));
});

test("BDD scenario evidence: /skills query accepts valid and rejects invalid", async () => {
  const { SkillsQuerySchema } = await loadContracts();

  const validCategory = SkillsQuerySchema.safeParse({ category: "frontend" });
  const validHighlight = SkillsQuerySchema.safeParse({ highlight: "true" });
  const validCombined = SkillsQuerySchema.safeParse({ category: "backend", highlight: "false" });
  const validNeither = SkillsQuerySchema.safeParse({});
  const invalidCategory = SkillsQuerySchema.safeParse({ category: "devops" });
  const invalidHighlight = SkillsQuerySchema.safeParse({ highlight: "1" });

  assert.equal(validCategory.success, true);
  assert.equal(validHighlight.success, true);
  assert.equal(validCombined.success, true);
  assert.equal(validNeither.success, true);
  assert.equal(invalidCategory.success, false);
  assert.equal(invalidHighlight.success, false);
});

test("BDD scenario evidence: nullable and empty-array edge cases parse", async () => {
  const fixture = await loadFixture();
  const {
    ProfileSchema,
    ExperienceSchema,
    CertificationSchema,
    ProjectSchema,
  } = await loadContracts();

  const profileNullable = {
    ...fixture.profile,
    phone: null,
    cv_url: null,
  };
  const experienceNullable = {
    ...fixture.experience[0],
    end_date: null,
  };
  const certificationEmptyKeywords = {
    ...fixture.certifications[0],
    keywords: [],
  };
  const projectEmptyArrays = {
    ...fixture.projects[0],
    technologies: [],
    tags: [],
  };

  assert.doesNotThrow(() => ProfileSchema.parse(profileNullable));
  assert.doesNotThrow(() => ExperienceSchema.parse(experienceNullable));
  assert.doesNotThrow(() => CertificationSchema.parse(certificationEmptyKeywords));
  assert.doesNotThrow(() => ProjectSchema.parse(projectEmptyArrays));
});
