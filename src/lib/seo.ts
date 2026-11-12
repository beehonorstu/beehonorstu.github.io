/**
 * Shared canonical and language metadata. URLs remain in the existing /zh/ and /tw/
 * routes, while HTML and hreflang use proper BCP-47 language tags.
 */
export const languageTag = (locale: string): string => {
  if (locale === 'zh') return 'zh-Hans';
  if (locale === 'tw') return 'zh-Hant';
  return locale;
};

export const normalizeSeoPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length ? `/${segments.join('/')}/` : '/';
};

export const canonicalFor = (pathname: string, site: URL | string): string =>
  new URL(normalizeSeoPath(pathname), site).toString();

export const pathWithoutLocale = (pathname: string, currentLocale: string): string => {
  const parts = normalizeSeoPath(pathname).split('/').filter(Boolean);
  if (currentLocale !== 'en' && parts[0] === currentLocale) parts.shift();
  return parts.length ? `/${parts.join('/')}/` : '/';
};

export const localizedUrl = (basePath: string, locale: string, site: URL | string): string =>
  canonicalFor(locale === 'en' ? basePath : `/${locale}${basePath}`, site);
