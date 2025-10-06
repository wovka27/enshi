import type { Component } from 'vue';
import 'vue-router';
import type { IDrawer } from '@shared/ui/ui-drawer/model';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | ((route: import('vue-router').RouteLocationNormalized) => string);
    requiresAuth: boolean;
    drawer?: IDrawer;
    layout?: boolean | 'auth';
    bgImg?: 'login' | 'register' | 'recovery' | 'enter_code' | 'change_pass';
    authContent?: {
      title: string;
      subtitle?: string;
    };
    nlmt?: boolean;
  }

  type CustomRouterViewName = 'default' | 'drawer' | 'header' | 'footer';

  interface RouteRecordMultipleViews {
    components: Partial<Record<CustomRouterViewName, Component>>;
  }

  interface RouteRecordNormalized {
    components: Partial<Record<CustomRouterViewName, Component>> | null | undefined;
  }
}
