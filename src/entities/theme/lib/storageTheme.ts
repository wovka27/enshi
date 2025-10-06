import type { ThemeType } from '@entities/theme/model';
import { storage } from '@shared/lib/utils';

const STORAGE_KEY = 'theme';

export const storageTheme = {
  set: (value: ThemeType) => storage.set(STORAGE_KEY, value),
  get: (): ThemeType => storage.get(STORAGE_KEY),
  remove: () => storage.remove(STORAGE_KEY),
};
