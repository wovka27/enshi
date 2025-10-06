import { type IToastItem, useToastStore } from '@entities/app-toast/model';

export const toast = (options: IToastItem) => useToastStore().add(options);
