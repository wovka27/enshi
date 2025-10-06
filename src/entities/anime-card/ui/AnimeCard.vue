<script setup lang="ts">
  import { computed } from 'vue';
  import AnimeCardRating from '@entities/anime-card-rating/ui';
  import type { IAnimeCardProps } from '@entities/anime-card/model';
  import AnimeCardPoster from '@entities/anime-card/ui/AnimeCardPoster.vue';
  import AnimeCardTitle from '@entities/anime-card/ui/AnimeCardTitle.vue';

  interface IAnimeCardDefaultProps {
    data: IAnimeCardProps;
  }

  const props = defineProps<IAnimeCardDefaultProps>();

  const meta = computed(() => {
    const genre = props.data.genre || [];

    return {
      year: String(props.data.year || ''),
      genre: (typeof genre === 'string' ? JSON.parse(genre) : genre).slice(0, 1).join('/'),
    };
  });
</script>

<template>
  <router-link
    :to="{ name: 'anime_page', params: { id: data.id } }"
    class="AnimeCardDefault"
    :class="data.size"
    draggable="false"
  >
    <AnimeCardPoster :img-src="data.src ?? data.poster_url">
      <AnimeCardRating
        v-if="data.rating"
        pos="bottom-left"
        :value="data.rating"
        icon="star"
        type="small"
      />
    </AnimeCardPoster>
    <AnimeCardTitle :text="data.title" />
    <div class="AnimeCardDefault__infoContainer">
      <p class>{{ meta.year }}</p>
      <p class="p2">{{ meta.genre }}</p>
    </div>
  </router-link>
</template>

<style lang="scss">
  .AnimeCardDefault {
    cursor: pointer;
    max-width: 196px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .AnimeCardDefault__infoContainer {
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      color: var(--color-gray-9b);
      font-size: fluid(14, 10);
      line-height: fluid(17, 11);
    }

    .p2 {
      max-width: 80px;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: horizontal;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
  }
</style>
