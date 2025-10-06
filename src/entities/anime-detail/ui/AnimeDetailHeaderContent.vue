<script setup lang="ts">
  import { computed } from 'vue';
  import AddFavorite from '@features/add-favorite';
  import ChangeRating from '@features/change-rating';
  import NextEpisodeTimer from '@features/next-episode-timer';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import AnimeMeta from '@entities/anime-meta';

  const animeDetailStore = useAnimeDetailStore();

  const meta = computed<Record<string, string | number> | null>(() => {
    if (!animeDetailStore.data) return null;

    const episodes_total = animeDetailStore.data.episodes_total;
    const episodes_aired = animeDetailStore.data.episodes_aired;

    const episodes = episodes_aired && episodes_total ? `${episodes_aired}/${episodes_total}` : '';
    return {
      Год: animeDetailStore.data.year || '',
      Эпизоды: episodes,
      Жанр: animeDetailStore.data.anime_genres?.length
        ? animeDetailStore.data.anime_genres.slice(0, 2)?.join(', ') || ''
        : '',
    };
  });
</script>

<template>
  <div class="AnimeDetailView-header__content">
    <div class="AnimeDetailView-header__title-container">
      <h1 class="AnimeDetailView-header__title">{{ animeDetailStore.data?.title }}</h1>
      <AnimeMeta
        :data="meta"
        size="large"
      />
    </div>
    <NextEpisodeTimer />
    <UiTextCollapse :text="animeDetailStore.data?.description">
      <div class="AnimeDetailView-header-content__actions">
        <AddFavorite />
        <ChangeRating />
      </div>
    </UiTextCollapse>
  </div>
</template>

<style>
  .AnimeDetailView-header-content__actions {
    display: flex;
    gap: 20px;
  }
</style>
