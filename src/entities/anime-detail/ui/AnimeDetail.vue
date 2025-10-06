<script setup lang="ts">
  import { onBeforeUnmount } from 'vue';
  import { onBeforeRouteUpdate } from 'vue-router';
  import { createAnimeDetailGuard } from '@app/router/config/guards';
  import AddAnimeComment from '@features/add-anime-comment/ui/AddAnimeComment.vue';
  import AnimeDependent from '@entities/anime-dependent';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import AnimeDetailBg from '@entities/anime-detail/ui/AnimeDetailBg.vue';
  import AnimeDetailBody from '@entities/anime-detail/ui/AnimeDetailBody.vue';
  import AnimeDetailHeader from '@entities/anime-detail/ui/AnimeDetailHeader.vue';
  import AnimeDetailPlayer from '@entities/anime-detail/ui/AnimeDetailPlayer.vue';
  import AnimeSimilar from '@entities/anime-similar';

  const animeDetailStore = useAnimeDetailStore();

  onBeforeRouteUpdate(createAnimeDetailGuard);
  onBeforeUnmount(() => animeDetailStore.$reset());
</script>

<template>
  <template v-if="animeDetailStore.data">
    <AnimeDetailBg />
    <AnimeDetailHeader />
    <AnimeDetailBody>
      <AnimeDetailPlayer :src="animeDetailStore.data?.player_link || ''" />
    </AnimeDetailBody>
    <AnimeDependent />
    <AnimeSimilar />
    <AddAnimeComment />
  </template>
</template>
