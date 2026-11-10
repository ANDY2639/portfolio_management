import { expect, test } from '@playwright/test';

test('home renders the English content by default', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Andrés');
  await expect(page.getByText('Idea Latente SAS')).toBeVisible();
  await expect(page.getByText('Languages').first()).toBeVisible();
});

test('spanish page renders translated content', async ({ page }) => {
  await page.goto('/es');

  await expect(page.getByText('Lenguajes').first()).toBeVisible();
  await expect(page.getByText('Bases de Datos').first()).toBeVisible();
});
