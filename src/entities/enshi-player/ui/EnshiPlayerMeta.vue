<script setup lang="ts">
  import { computed } from 'vue';

  const EPISODE_NUMBER_TEXT = ' серия';

  const props = defineProps<{
    title: string;
    episodeNumber: string;
  }>();
  const text = computed(() => {
    return props.episodeNumber ? props.episodeNumber + EPISODE_NUMBER_TEXT : '';
  });
</script>

<template>
  <div class="EnshiPlayerMeta">
    <p class="EnshiPlayerMeta__title">{{ title }}</p>
    <p
      v-if="text"
      class="EnshiPlayerMeta__episode"
    >
      {{ text }}
    </p>
  </div>
</template>

<style lang="scss">
  .EnshiPlayerMeta {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    &__title {
      display: -moz-box;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      max-width: 370px;
      font-size: fluid(24, 16);
      font-weight: var(--font-weight-500);
      color: var(--color-white);
    }
    &__episode {
      font-size: fluid(20, 14);
      font-weight: var(--font-weight-500);
      color: var(--color-gray-82);
    }
  }
</style>
