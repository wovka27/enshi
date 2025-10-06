import type { App } from 'vue';
import { store } from '@app/store';

export const withStore = (app: App<Element>) => {
  app.use(store);
};
