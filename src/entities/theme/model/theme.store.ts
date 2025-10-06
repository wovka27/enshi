import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { themeTypeMap } from '@entities/theme/config';
import { storageTheme } from '@entities/theme/lib';
import type { ThemeType } from '@entities/theme/model';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeType>('dark');
  const count = ref(0);

  const themeIconName = computed(() => (theme.value ? themeTypeMap[theme.value] : 'theme-light'));
  const themeText = computed(() => (theme.value === 'dark' ? 'Тёмная' : 'Светлая'));

  const setTheme = (value: ThemeType) => {
    storageTheme.set((theme.value = value));

    if (!theme.value) {
      document.documentElement.removeAttribute('data-theme');
      return;
    }
    document.documentElement.setAttribute('data-theme', theme.value || '');
  };

  const checkTheme = () => setTheme(storageTheme.get());

  const changeTheme = () => {
    const themeList: ThemeType[] = ['light', 'dark'];

    setTheme(themeList[count.value % themeList.length]);

    count.value++;
  };

  return { theme, themeIconName, themeText, setTheme, checkTheme, changeTheme };
});
