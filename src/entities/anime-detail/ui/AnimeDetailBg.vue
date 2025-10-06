<script setup lang="ts">
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import { useThemeStore } from '@entities/theme/model';

  const animeDetailStore = useAnimeDetailStore();
  const themeStore = useThemeStore();
</script>

<template>
  <div
    class="AnimeDetailBg"
    :data-theme="themeStore.theme"
  >
    <UiImage
      width="100%"
      height="340px"
      :src="animeDetailStore.data?.poster_url || ''"
      error-src="/images/banner_fallback.webp"
    />
  </div>
</template>

<style lang="scss">
  .AnimeDetailBg {
    position: relative;
    overflow: hidden;
    height: calc(450px + var(--header-height));

    @include mobile {
      height: calc(250px + var(--header-height));
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center right;
      display: block;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: var(--theme-detail-bg);
      z-index: 5;
    }
  }
</style>
