<script setup lang="ts">
  import { useThemeStore } from '@entities/theme/model';
  import { useMatchMedia } from '@shared/lib/composables/match-media';

  const themeStore = useThemeStore();

  themeStore.checkTheme();

  useMatchMedia('(prefers-color-scheme: light)', (evt) => {
    themeStore.setTheme(evt.target?.matches ? 'dark' : 'light');
  });
</script>

<template>
  <UiIconButton
    class="HeaderThemeButton hidden-mobile-s"
    style="color: var(--color-gray-82)"
    :size="48"
    :icon-name="themeStore.themeIconName"
    @click="themeStore.changeTheme"
  />
</template>
