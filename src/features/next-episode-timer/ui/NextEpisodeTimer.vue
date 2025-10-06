<script setup lang="ts">
  import { computed } from 'vue';
  import { dateHelper } from '@features/next-episode-timer/lib';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';

  const animeDetailStore = useAnimeDetailStore();

  const value = computed(() => {
    const nextEpisodeAt = animeDetailStore.data?.next_episode_at;
    if (!nextEpisodeAt) return null;

    const nextDate = new Date(nextEpisodeAt);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // сутки вперёд

    if (nextDate <= now || nextDate >= tomorrow) return null;

    const res = dateHelper(nextEpisodeAt);
    if (!res) return null;

    const weekday = res.weekday.split(' ');

    if (weekday.length > 1) {
      return `След. серия ${weekday[0]} <span>${weekday[1]}</span> (${res.date})`;
    }

    return `След. серия <span>${weekday[0]}</span> (${res.date})`;
  });
</script>

<template>
  <div
    v-if="value"
    inert
    class="NextEpisodeTimer"
    v-html="value"
  ></div>
</template>

<style lang="scss">
  .NextEpisodeTimer {
    max-width: max-content;
    color: var(--color-gray-82);
    flex-shrink: 0;
    padding: 12px 20px;
    background-color: var(--theme-block-bg);
    border: var(--border) var(--color-gray-82-20);
    border-radius: var(--border-radius-10);
    transition-property: border-color, color;

    span {
      color: var(--theme-text);
      font-weight: var(--font-weight-600);
    }

    @include hover {
      border-color: var(--color-gray-82);
      color: var(--color-white-40);
    }
  }
</style>
