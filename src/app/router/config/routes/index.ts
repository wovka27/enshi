import type { RouteRecordRaw } from 'vue-router';
import { commonRoutes } from '@app/router/config/routes/commonRoutes.ts';
import { privateRoutes } from '@app/router/config/routes/privateRoutes.ts';
import { publicRoutes } from '@app/router/config/routes/publicRoutes.ts';

export const routes: RouteRecordRaw[] = [...publicRoutes, ...privateRoutes, ...commonRoutes];
