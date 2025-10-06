import type { IUser } from '@entities/user/model';
import { storage } from '@shared/lib/utils';

const STORAGE_KEY = 'user';

export const storageUser = {
  set: (value: IUser): void => storage.set<IUser>(STORAGE_KEY, value),
  get: (): IUser | null => storage.get<IUser>(STORAGE_KEY),
  remove: (): void => storage.remove(STORAGE_KEY),
};
