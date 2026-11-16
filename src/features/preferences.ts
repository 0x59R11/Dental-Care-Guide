import { isLocale } from '../i18n/locales';
import {
  browserStorage,
  readStored,
  storagePrefix,
  writeStored,
} from '../lib/storage';
import { withBase } from '../lib/urls';

const language = document.querySelector<HTMLSelectElement>('#language-select');
language?.addEventListener('change', () => {
  if (!isLocale(language.value)) return;
  writeStored(
    browserStorage('localStorage'),
    storagePrefix + 'language',
    language.value,
  );
  const destination = withBase(
    `${language.value}/${language.dataset.route || ''}`,
    language.dataset.base,
  );
  window.location.assign(destination + window.location.hash);
});

const theme = document.querySelector<HTMLSelectElement>('#theme-select');
if (theme) {
  const saved = readStored<string>(
    browserStorage('localStorage'),
    storagePrefix + 'theme',
  );
  theme.value = saved === 'light' || saved === 'dark' ? saved : 'system';
  theme.addEventListener('change', () => {
    if (theme.value === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme.value;
    writeStored(
      browserStorage('localStorage'),
      storagePrefix + 'theme',
      theme.value,
    );
  });
}
