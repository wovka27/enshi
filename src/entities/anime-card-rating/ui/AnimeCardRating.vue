<script setup lang="ts">
  import { computed } from 'vue';

  interface IAnimeCardRatingProps {
    type: 'small' | 'medium' | 'large';
    pos: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    icon: 'star' | 'enshi';
    value?: string;
  }

  const props = defineProps<IAnimeCardRatingProps>();

  const color = computed<'high' | 'medium' | 'low'>(() => {
    if (!props.value) return 'low';
    else if (+props.value >= 7) return 'high';
    else if (+props.value >= 4.5) return 'medium';
    else return 'low';
  });
</script>

<template>
  <p
    :data-color="color"
    :title="`Рейтинг ${value}`"
    :data-pos="pos"
    :data-type="type"
    class="AnimeCardRating"
  >
    <i
      class="AnimeCardRating__icon"
      :class="icon"
    ></i>
    {{ value }}
  </p>
</template>

<style lang="scss">
  @use 'sass:color';
  .AnimeCardRating {
    @include fluid-text(14, 10);
    display: flex;
    align-items: center;
    color: var(--color-white);
    position: absolute;
    font-weight: 600;

    //data-pos
    &[data-pos='bottom-left'] {
      bottom: 0;
      left: 0;
    }

    &[data-pos='bottom-right'] {
      bottom: 0;
      right: 0;
    }

    &[data-pos='top-left'] {
      top: 0;
      left: 0;
    }

    &[data-pos='top-right'] {
      top: 0;
      right: 0;
    }

    &[data-pos='bottom-right'][data-type='small'],
    &[data-pos='top-left'][data-type='small'] {
      border-radius: fluid(20, 10) 0 fluid(20, 10) 0;
    }

    &[data-pos='bottom-right'][data-type='large'],
    &[data-pos='top-left'][data-type='large'] {
      border-radius: 10px 0 10px 0;
    }

    // data-type
    &[data-type='small'] {
      border-radius: 0 fluid(20, 10) 0 fluid(20, 10);
      padding: fluid(7.5, 5) fluid(29, 14);
      gap: fluid(5, 4);
    }

    &[data-type='medium'] {
      border-radius: 0 10px 0 10px;
      padding: fluid(7.5, 5) fluid(29, 14);
      gap: fluid(5, 4);
    }

    &[data-type='large'] {
      border-radius: 0 10px 0 10px;
      padding: fluid(14, 8.5) fluid(31, 24);
      gap: fluid(10, 8);
    }

    // data-color
    &[data-color='high'] {
      background: linear-gradient(to bottom right, color.adjust(#1cba6eff, $lightness: 15%), #1cba6eff);
    }

    &[data-color='low'] {
      background: linear-gradient(to bottom right, color.adjust(#e32636, $lightness: 15%), #e32636);
    }

    &[data-color='medium'] {
      background: linear-gradient(to bottom right, color.adjust(#ffa500, $lightness: 15%), #ffa500);
    }
  }

  .AnimeCardRating__icon {
    aspect-ratio: 1 / 1;
    background-repeat: no-repeat;
    background-position: center;

    &.star {
      width: fluid(14, 12);
      background-size: fluid(14, 12);
      background-image: url('data:image/svg+xml;utf8,<svg width="11.238281" height="10.738312" viewBox="0 0 11.2383 10.7383" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Star 1" d="M5.14 0.34L4.16 3.37C4.09 3.57 3.9 3.71 3.68 3.71L0.5 3.71C0.01 3.71 -0.19 4.33 0.2 4.62L2.78 6.49C2.95 6.62 3.03 6.84 2.96 7.05L1.98 10.08C1.83 10.54 2.35 10.92 2.75 10.64L5.32 8.76C5.5 8.64 5.73 8.64 5.91 8.76L8.48 10.64C8.88 10.92 9.4 10.54 9.25 10.08L8.27 7.05C8.2 6.84 8.28 6.62 8.45 6.49L11.03 4.62C11.42 4.33 11.22 3.71 10.73 3.71L7.55 3.71C7.33 3.71 7.14 3.57 7.07 3.37L6.09 0.34C5.94 -0.12 5.29 -0.12 5.14 0.34Z" fill="%23FFFFFF" fill-opacity="1.000000" fill-rule="evenodd" /></svg>');
    }

    &.enshi {
      width: fluid(22, 16);
      background-size: fluid(22, 16);
      background-image: url('data:image/svg+xml;utf8,<svg width="22.000000" height="22.000000" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M0 11C0 9.45 0.29 8.02 0.86 6.68C1.43 5.33 2.21 4.18 3.22 3.18C4.23 2.19 5.38 1.42 6.7 0.85C8.02 0.28 9.44 0 10.95 0C12.47 0 13.9 0.28 15.24 0.85C16.59 1.42 17.76 2.21 18.77 3.18C19.78 4.18 20.56 5.33 21.13 6.68C21.7 8.02 22 9.45 22 11C22 11.8 21.91 12.56 21.74 13.27C20.79 12.87 19.81 12.58 18.79 12.41C17.78 12.25 16.77 12.16 15.76 12.16C14.5 12.16 13.27 12.29 12.04 12.55C10.83 12.8 9.63 13.24 8.46 13.83L8.46 10.36C10.72 9.53 13.05 9.12 15.46 9.12C15.92 9.12 16.37 9.13 16.82 9.16C17.27 9.19 17.72 9.24 18.18 9.3C17.97 8.42 17.64 7.62 17.17 6.92C16.7 6.22 16.14 5.62 15.5 5.14C14.86 4.66 14.14 4.28 13.35 4.01C12.56 3.74 11.76 3.6 10.96 3.6C9.96 3.6 9.01 3.79 8.13 4.18C7.24 4.56 6.47 5.08 5.81 5.73C5.16 6.39 4.62 7.17 4.23 8.09C3.83 9.01 3.61 9.97 3.61 11C3.61 12.03 3.81 12.99 4.21 13.89C4.61 14.79 5.15 15.58 5.83 16.24C6.5 16.92 7.28 17.44 8.16 17.8C9.05 18.18 9.98 18.36 10.95 18.36C11.81 18.36 12.62 18.23 13.4 17.97C14.18 17.72 14.89 17.32 15.55 16.78C15.98 17.24 16.4 17.69 16.82 18.14C17.23 18.6 17.64 19.07 18.04 19.55C17.04 20.35 15.93 20.96 14.71 21.38C13.5 21.79 12.24 22 10.95 22C9.58 22 8.26 21.75 7.03 21.27C5.78 20.79 4.67 20.11 3.69 19.24C2.72 18.37 1.91 17.34 1.28 16.18C0.66 15.01 0.26 13.74 0.09 12.37C0.03 12.14 0.01 11.91 0.01 11.68C0 11.46 0 11.23 0 11Z" fill="%23FFFFFF" fill-opacity="1.000000" fill-rule="nonzero" /></svg>');
    }
  }
</style>
