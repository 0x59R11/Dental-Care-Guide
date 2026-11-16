export function readStored<T>(
  storage: Storage | undefined,
  key: string,
): T | null {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeStored(
  storage: Storage | undefined,
  key: string,
  value: unknown,
): boolean {
  try {
    if (!storage) return false;
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function browserStorage(
  kind: 'localStorage' | 'sessionStorage',
): Storage | undefined {
  try {
    return window[kind];
  } catch {
    return undefined;
  }
}

export const storagePrefix = `dental-care:${import.meta.env.BASE_URL}:v1:`;
