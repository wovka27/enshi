<script setup lang="ts">
  import { computed } from 'vue';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';

  const animeDetailStore = useAnimeDetailStore();

  const textBtn = computed(() => {
    return !animeDetailStore.hasFavorite ? 'В избранное' : 'В избранном';
  });
</script>

<template>
  <div class="AddFavorite">
    <UiButton
      :inert="animeDetailStore.hasFavorite"
      w-content
      size="small"
      :btn-type="animeDetailStore.hasFavorite ? 'success' : 'primary'"
      @click="animeDetailStore.addFavorite"
    >
      {{ textBtn }}
    </UiButton>
    <UiButton
      v-if="animeDetailStore.hasFavorite"
      w-content
      size="small-icon"
      btn-type="danger"
      @click="animeDetailStore.removeFavorite"
    >
      <UiIcon
        width="40"
        name="trash"
      />
    </UiButton>
  </div>
</template>

<style lang="scss">
  .AddFavorite {
    flex-shrink: 0;
    display: flex;
    gap: 10px;
  }
</style>
