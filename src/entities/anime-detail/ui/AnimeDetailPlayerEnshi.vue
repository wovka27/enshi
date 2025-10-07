<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';
  import EnshiPlayer from '@entities/enshi-player/ui/EnshiPlayer.vue';
  import EnshiPlayerEpisodeList from '@entities/enshi-player/ui/EnshiPlayerEpisodeList.vue';

  const animeDetailStore = useAnimeDetailStore();
  const videoStore = useVideoStore();

  const playerRef = ref(null);

  const url = computed(
    () => animeDetailStore.allEpisodes.find((i) => i.quality.name === videoStore.currentQuality)?.series_url ?? ''
  );

  const meta = computed(() => ({
    title: animeDetailStore.data?.title || '',
    episodeNumber: animeDetailStore.selectedEpisode?.series_number,
  }));

  const handleEnd = () => {
    animeDetailStore.nextEpisode();
  };
</script>

<template>
  <div class="AnimeDetailPlayerEnsi">
    <div class="AnimeDetailPlayerEnsi__container">
      <EnshiPlayer
        v-if="url"
        ref="playerRef"
        :src="url"
        :meta="meta"
        :quality-options="videoStore.qualities"
        @next="animeDetailStore.nextEpisode"
        @prev="animeDetailStore.prevEpisode"
        @end="handleEnd"
      />
    </div>
    <EnshiPlayerEpisodeList
      :model-value="animeDetailStore.episodeIndex"
      :episodes="animeDetailStore.episodes"
      @update:model-value="animeDetailStore.setEpisodeIndex"
    />
  </div>
</template>

<style lang="scss">
  .AnimeDetailPlayerEnsi {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .AnimeDetailPlayerEnsi__container {
    max-height: 466px;
    min-height: 430px;
    background-color: var(--color-dark-16);
  }
</style>
