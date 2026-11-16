export const locales = ['en', 'ru', 'uk', 'de'] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
  de: 'Deutsch',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

export function preferredLocale(
  saved: unknown,
  languages: readonly string[],
): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) {
    const baseLanguage = language.toLowerCase().split('-')[0];
    if (isLocale(baseLanguage)) return baseLanguage;
  }
  return 'en';
}
