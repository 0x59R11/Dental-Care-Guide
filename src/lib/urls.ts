import type { Locale } from '../i18n/locales';

export function withBase(path = '', base = import.meta.env.BASE_URL): string {
  const prefix = base.replace(/\/$/, '');
  return `${prefix}/${path.replace(/^\//, '')}`;
}

export function localeUrl(locale: Locale, path = ''): string {
  return withBase(`${locale}/${path.replace(/^\//, '')}`);
}
