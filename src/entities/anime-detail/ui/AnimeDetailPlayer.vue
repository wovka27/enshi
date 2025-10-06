<script setup lang="ts">
  import { computed } from 'vue';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import AnimeDetailPlayerEnshi from '@entities/anime-detail/ui/AnimeDetailPlayerEnshi.vue';
  import AnimeDetailPlayerHeader from '@entities/anime-detail/ui/AnimeDetailPlayerHeader.vue';
  import AnimeDetailPlayerKodik from '@entities/anime-detail/ui/AnimeDetailPlayerKodik.vue';

  defineProps<{ src: string }>();

  const animeDetailStore = useAnimeDetailStore();

  const currentPlayer = computed(
    () =>
      ({
        kodik: AnimeDetailPlayerKodik,
        enshi: AnimeDetailPlayerEnshi,
      })[animeDetailStore.selectedPlayerType]
  );
</script>

<template>
  <AnimeDetailPlayerHeader />
  <component
    :is="currentPlayer"
    :src="src"
  />
</template>
