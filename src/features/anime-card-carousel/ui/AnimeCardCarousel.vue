<script setup lang="ts">
  import { computed } from 'vue';
  import AnimeCard from '@entities/anime-card';
  import type { IAnimeCardProps, IBaseAnimeData } from '@entities/anime-card/model';

  interface IAnimeCardListProps {
    id?: string;
    title: string;
    data: IBaseAnimeData[];
    isShadow?: boolean;
  }

  const props = withDefaults(defineProps<IAnimeCardListProps>(), {
    isShadow: true,
  });

  const list = computed(() =>
    props.data.map((item) => ({
      genre: item.anime_genres || null,
      rating: item.shikimori_rating,
      src: item.poster_url,
      year: item.year,
      title: item.title,
      id: item.id,
    }))
  );
</script>

<template>
  <UiSection
    v-if="list.length"
    :id="id"
    :title="title"
  >
    <template #header>
      <slot name="header" />
    </template>
    <UiCarousel
      hide-prev-button
      hide-next-button
      :is-shadow="isShadow"
      :list="list"
    >
      <template #default="{ item }">
        <AnimeCard :data="item as IAnimeCardProps" />
      </template>
    </UiCarousel>
  </UiSection>
</template>
