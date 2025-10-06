<script setup lang="ts">
  interface IAnimeCardTitleProps {
    text: string;
    size?: 'medium' | 'large';
  }

  defineProps<IAnimeCardTitleProps>();
</script>

<template>
  <p
    class="AnimeCardTitle"
    :class="size"
  >
    {{ text }}
  </p>
</template>

<style lang="scss">
  .AnimeCardTitle {
    color: var(--theme-text);
    max-width: max-content;
    &.large {
      font-size: fluid(28, 18);
      line-height: fluid(34, 22);
      -webkit-line-clamp: 1;
    }

    &.medium {
      font-size: fluid(20, 16);
      line-height: fluid(24, 20);
      -webkit-line-clamp: 1;
    }

    &:not(&.large, &.medium) {
      width: fluid(196, 110);
    }

    font-size: fluid(15, 12);
    font-weight: 600;
    line-height: fluid(18, 15);
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
</style>
