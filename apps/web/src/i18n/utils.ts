import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getLocalizedPath(lang: Lang, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (lang === defaultLang) return normalized;
  return normalized === '/' ? `/${lang}/` : `/${lang}${normalized}`;
}

export function getPathForLocale(locale: Lang, pathname: string): string {
  const base = pathname.replace(/^\/es(?=\/|$)/, '') || '/';
  return getLocalizedPath(locale, base);
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function formatDate(dateStr: string | null | undefined, lang: Lang): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', {
    year: 'numeric',
    month: 'short',
  });
}
