import { config } from 'dotenv';
import { beforeAll, describe, expect, it } from 'vitest';

config({ path: '../../apps/web/.env.local' });

describe('loadContent', () => {
  let loadContent: typeof import('./queries.js').loadContent;

  beforeAll(async () => {
    ({ loadContent } = await import('./queries.js'));
  });

  it('loads the Spanish content from Neon', async () => {
    const content = await loadContent('es');

    expect(content.locale).toBe('es');
    expect(content.profile?.fullName).toContain('Guerrero');
    expect(content.profile?.title).toBe('Full Stack Developer');
    expect(content.experience).toHaveLength(7);
    expect(content.skillGroups).toHaveLength(5);
    expect(content.skillGroups[0]?.label).toBe('Lenguajes');
    expect(content.education).toHaveLength(1);
    expect(content.certifications.length).toBe(12);
    expect(content.projects).toHaveLength(0);
  });

  it('loads the English translations', async () => {
    const content = await loadContent('en');

    expect(content.locale).toBe('en');
    expect(content.skillGroups[0]?.label).toBe('Languages');
    expect(content.experience[0]?.role).toBe('Full Stack Developer');
  });

  it('falls back to Spanish when a translation is missing', async () => {
    const content = await loadContent('en');

    expect(content.profile?.bioP1.length).toBeGreaterThan(0);
  });
});
