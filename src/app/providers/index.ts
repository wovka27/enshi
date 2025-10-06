import type { App } from 'vue';
import { withRouter } from '@app/providers/with-router.ts';
import { withStore } from '@app/providers/with-store.ts';

export const withProviders = (app: App<Element>) => {
  withStore(app);
  withRouter(app);
};
