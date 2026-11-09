import { expect, test } from '@playwright/test';

test('home renders the Spanish content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Andrés');
  await expect(page.getByText('Idea Latente SAS')).toBeVisible();
  await expect(page.getByText('Lenguajes').first()).toBeVisible();
});

test('english page renders translated content', async ({ page }) => {
  await page.goto('/en/');

  await expect(page.getByText('Languages').first()).toBeVisible();
  await expect(page.getByText('Databases').first()).toBeVisible();
});
