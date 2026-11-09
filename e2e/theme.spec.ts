import { expect, test } from '@playwright/test';

test('theme switch changes data-theme', async ({ page }) => {
  await page.goto('/');

  const group = page.getByRole('group', { name: 'Theme' });

  await group.getByRole('button', { name: 'Claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await group.getByRole('button', { name: 'Oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await group.getByRole('button', { name: 'Sistema' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);
});
