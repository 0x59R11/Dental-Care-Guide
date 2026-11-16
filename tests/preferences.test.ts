import { expect, it } from 'vitest';
import { preferredLocale } from '../src/i18n/locales';
import { readStored, writeStored } from '../src/lib/storage';
import { withBase } from '../src/lib/urls';
it.each([
  ['de', ['ru'], 'de'],
  ['DE', ['fr', 'UK-UA'], 'uk'],
  [null, ['es', 'de-AT', 'en-US'], 'de'],
  ['invalid', ['RU-ru'], 'ru'],
  [null, ['fr', 'ja'], 'en'],
  [null, [], 'en'],
])('selects locale for %j and %j', (saved, languages, expected) =>
  expect(preferredLocale(saved, languages as string[])).toBe(expected),
);
it('handles malformed and inaccessible storage', () => {
  const storage = {
    getItem: () => '{broken',
    setItem: () => {
      throw new Error('blocked');
    },
  } as unknown as Storage;
  expect(readStored(storage, 'key')).toBeNull();
  expect(writeStored(storage, 'key', {})).toBe(false);
  expect(readStored(undefined, 'key')).toBeNull();
  expect(writeStored(undefined, 'key', {})).toBe(false);
});
it('handles both hosting bases without doubled slashes', () => {
  expect(withBase('de/learn/', '/')).toBe('/de/learn/');
  expect(withBase('/de/learn/', '/Dental-Care-Guide/')).toBe(
    '/Dental-Care-Guide/de/learn/',
  );
});
