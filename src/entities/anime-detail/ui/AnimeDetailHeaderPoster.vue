<script setup lang="ts">
  import AnimeCardRating from '@entities/anime-card-rating/ui';
  import AnimeCardPoster from '@entities/anime-card/ui/AnimeCardPoster.vue';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';

  const animeDetailStore = useAnimeDetailStore();
</script>

<template>
  <AnimeCardPoster
    class="AnimeDetailHeaderPoster"
    style="max-width: 225px"
    inert
    size="small"
    width="225px"
    height="340px"
    :img-src="animeDetailStore.data?.poster_url"
  >
    <AnimeCardRating
      type="small"
      pos="top-right"
      icon="enshi"
      :value="animeDetailStore.data?.enshi_rating ?? animeDetailStore.data?.shikimori_rating"
    />
  </AnimeCardPoster>
</template>

<style lang="scss">
  .AnimeDetailHeaderPoster {
    @include mobile {
      justify-self: center;
    }
  }
</style>
