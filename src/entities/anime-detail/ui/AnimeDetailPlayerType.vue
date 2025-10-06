<script setup lang="ts">
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import UiIconSelect from '@shared/ui/ui-icon-select/ui/UiIconSelect.vue';

  const animeDetailStore = useAnimeDetailStore();

  const options = [
    { value: 'enshi', label: 'Enshi' },
    { value: 'kodik', label: 'Kodik' },
  ];
</script>

<template>
  <UiIconSelect
    :model-value="animeDetailStore.selectedPlayerType"
    icon="video-player"
    :options="options"
    @update:model-value="animeDetailStore.setSelectedPlayerType"
  />
</template>
