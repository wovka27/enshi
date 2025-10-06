<script setup lang="ts">
  import type { IEnshiPlayerEpisodeProps } from '@entities/enshi-player/model/types.ts';

  defineProps<IEnshiPlayerEpisodeProps>();
</script>

<template>
  <div
    class="EnshiPlayerEpisode"
    :class="{ is_active }"
  >
    <div class="EnshiPlayerEpisode__poster">
      <UiImage
        :src="episode_poster"
        alt="poster-episode"
        error-src="/images/img.png"
      />
    </div>
    <p class="EnshiPlayerEpisode__text">{{ episode_number }}&nbsp;серия</p>
  </div>
</template>

<style lang="scss">
  .EnshiPlayerEpisode {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 8px;
    &.not_viewed {
      .EnshiPlayerEpisode__poster {
        filter: grayscale(1) brightness(27%);
      }
    }
    &.is_active {
      .EnshiPlayerEpisode__poster {
        border: 1px solid var(--theme-text);
      }
      .EnshiPlayerEpisode__text {
        color: var(--theme-text);
      }
    }
  }

  .EnshiPlayerEpisode__poster {
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    width: fluid(178, 118);
    height: fluid(98, 88);
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }

  .EnshiPlayerEpisode__text {
    color: var(--color-gray-82);
    font-family: Montserrat;
    font-size: fluid(16, 14);
    font-weight: 500;
    line-height: 20px;
  }
</style>
