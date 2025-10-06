<script setup lang="ts">
  interface IAnimeCardPosterProps {
    imgSrc?: string | null;
    size?: 'small' | 'medium' | 'large';
    width?: string;
    height?: string;
  }

  defineProps<IAnimeCardPosterProps>();
  defineEmits(['click']);
</script>

<template>
  <div
    class="AnimeCardPoster"
    @click="$emit('click')"
  >
    <div
      class="AnimeCardPoster__innerWrap"
      :class="size"
    >
      <UiImage
        :width="width ?? 196"
        :height="height ?? 285"
        :src="imgSrc"
        class="AnimeCardPoster__img"
        error-src="/images/img.png"
      />
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
  @use 'sass:color';

  .AnimeCardPoster {
    position: relative;
    border-radius: 22px;
    z-index: 1;

    &:has(.AnimeCardRating[data-color='high']) {
      &:before {
        background: linear-gradient(to bottom right, color.adjust(#1cba6eff, $lightness: 15%), #1cba6eff);
      }
    }

    &:has(.AnimeCardRating[data-color='low']) {
      &:before {
        background: linear-gradient(to bottom right, color.adjust(#e32636, $lightness: 15%), #e32636);
      }
    }

    &:has(.AnimeCardRating[data-color='medium']) {
      &:before {
        background: linear-gradient(to bottom right, color.adjust(#ffa500, $lightness: 15%), #ffa500);
      }
    }

    &:before {
      width: max-content;
      position: absolute;
      top: 1px;
      bottom: 1px;
      left: 0;
      right: 0;
      content: '';
      border-radius: inherit;
      display: inherit;
      z-index: -1;
      background: var(--color-primary);
      transition: all 0.2s ease-in-out;
      translate: 0 0;
    }

    @include hover {
      &:before {
        translate: 0 2%;
      }
      .AnimeCardPoster__img {
        scale: 1.1;
      }
    }

    &:focus-within {
      &:before {
        translate: 0 2%;
      }
      .AnimeCardPoster__img {
        scale: 1.1;
      }
    }
  }

  .AnimeCardPoster__innerWrap {
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
    border-radius: inherit;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &:not(&.small, &.medium, &.large) {
      width: fluid(196, 110);
      height: fluid(285, 160);
    }
  }

  .AnimeCardPoster__img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    object-position: center;
    transition: scale var(--transition-duration) ease-in-out;
  }

  .AnimeCardPoster__skeleton {
    position: absolute;
    top: -1px;
    bottom: -1px;
    right: -1px;
    left: -1px;
  }
</style>
