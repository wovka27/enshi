import AuthLayout from '@shared/layouts/auth/ui/AuthLayout.vue';
import MainLayout from '@shared/layouts/main';

export const layoutResolver = (layout: string | boolean) => {
  switch (layout) {
    case 'auth':
      return AuthLayout;
    default:
      return MainLayout;
  }
};
