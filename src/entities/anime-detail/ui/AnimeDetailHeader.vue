<script setup lang="ts">
  import AnimeDetailHeaderContent from '@entities/anime-detail/ui/AnimeDetailHeaderContent.vue';
  import AnimeDetailHeaderPoster from '@entities/anime-detail/ui/AnimeDetailHeaderPoster.vue';
</script>

<template>
  <div class="AnimeDetailView-header container">
    <div class="AnimeDetailView-header__inner">
      <AnimeDetailHeaderPoster />
      <AnimeDetailHeaderContent />
    </div>
  </div>
</template>

<style lang="scss">
  .AnimeDetailView-header {
    position: relative;
    z-index: 10;
    margin-top: -220px;
    margin-bottom: fluid(160, 60);
    @include flex-center();
  }

  .AnimeDetailView-header__inner {
    display: grid;
    grid-template-columns: 225px 1fr;
    align-items: start;
    grid-gap: 60px;

    @include mobile {
      grid-template-columns: 1fr;
    }

    h1 {
      max-width: 400px;
      margin-bottom: 14px;
      font-size: 28px;
      font-weight: 600;
      color: var(--theme-text);
    }
  }

  .AnimeDetailView-header__content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
