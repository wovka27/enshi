import type { ThemeType } from '@entities/theme/model';
import type { IconTypeName } from '@shared/ui/ui-icon/model';

export const themeTypeMap: Record<NonNullable<ThemeType>, IconTypeName> = {
  dark: 'theme-light',
  light: 'theme-dark',
};
