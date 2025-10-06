<script setup lang="ts">
  import SendInSupport from '@features/sendInSupport';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import AnimeDetailPlayerType from '@entities/anime-detail/ui/AnimeDetailPlayerType.vue';
  import AnimeDetailVoiceType from '@entities/anime-detail/ui/AnimeDetailVoiceType.vue';

  const animeDetailStore = useAnimeDetailStore();
</script>

<template>
  <div
    v-if="animeDetailStore.data?.enshi_player"
    class="AnimeDetailView-player__header"
  >
    <div class="AnimeDetailView-player__actions">
      <AnimeDetailPlayerType />
      <AnimeDetailVoiceType />
    </div>
    <SendInSupport />
  </div>
</template>

<style lang="scss">
  .AnimeDetailView-player__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
    align-items: center;
  }
  .AnimeDetailView-player__actions {
    display: flex;
    gap: 20px;
  }
</style>
