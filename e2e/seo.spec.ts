import { expect, test } from '@playwright/test';

const SITE = 'https://portfolio-management.vercel.app';

test('SEO tags on the English home', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', `${SITE}/es/`);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.png$/);

  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  expect(jsonLd).toContain('"@type":"Person"');
  expect(jsonLd).toContain('"@type":"ProfilePage"');
});

test('SEO tags on the Spanish home', async ({ page }) => {
  await page.goto('/es');

  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}/es/`);
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', `${SITE}/`);
});
