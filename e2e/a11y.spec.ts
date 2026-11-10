import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/skills',
  '/experience',
  '/contact',
  '/cv',
  '/es',
  '/es/about',
  '/es/skills',
  '/es/experience',
  '/es/contact',
  '/es/cv',
];

for (const route of routes) {
  test(`no serious a11y violations on ${route}`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );

    expect(
      serious,
      JSON.stringify(
        serious.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.length,
        })),
        null,
        2,
      ),
    ).toEqual([]);
  });
}
