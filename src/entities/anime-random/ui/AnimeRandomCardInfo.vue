<script setup lang="ts">
  import { computed } from 'vue';
  import AnimeCardTitle from '@entities/anime-card/ui/AnimeCardTitle.vue';
  import AnimeMeta from '@entities/anime-meta';

  interface IAnimeRandomCardInfoProps {
    title: string;
    year: number;
    episodesCount: number;
    outlineBtn?: boolean;
    idx: number;
    id: number;
  }

  const props = defineProps<IAnimeRandomCardInfoProps>();

  const meta = computed<Record<string, string | number> | null>(() => {
    return {
      Год: props.year || '',
      Эпизоды: props.episodesCount,
    };
  });
</script>

<template>
  <div class="AnimeRandomCardInfo">
    <div
      class="AnimeRandomCardInfo__text"
      :style="`gap: ${idx === 0 ? 8 : 5}px`"
    >
      <AnimeCardTitle
        :size="idx === 0 ? 'large' : 'medium'"
        :text="title"
      />
      <AnimeMeta :data="meta" />
    </div>
    <UiButton
      v-if="!outlineBtn"
      :to="{ name: 'anime_page', params: { id } }"
      btn-type="primary"
      class="AnimeRandoCardInfo__btn"
    >
      Смотреть&nbsp;&nbsp;
      <svg
        width="9.500000"
        height="10.663208"
        viewBox="0 0 9.5 10.6632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Polygon 3"
          d="M9 4.46L1.5 0.13C0.83 -0.25 0 0.23 0 1L0 9.66C0 10.43 0.83 10.91 1.5 10.52L9 6.19C9.66 5.81 9.66 4.85 9 4.46Z"
          fill="#FFFFFF"
          fill-opacity="1.000000"
          fill-rule="evenodd"
        />
      </svg>
    </UiButton>
    <UiButton
      v-else
      :to="{ name: 'anime_page', params: { id } }"
      btn-type="primary"
      class="AnimeRandoCardInfo__btn"
    >
      Смотреть&nbsp;&nbsp;
      <svg
        width="9.500000"
        height="10.663208"
        viewBox="0 0 9.5 10.6632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Polygon 3"
          d="M9 4.46L1.5 0.13C0.83 -0.25 0 0.23 0 1L0 9.66C0 10.43 0.83 10.91 1.5 10.52L9 6.19C9.66 5.81 9.66 4.85 9 4.46Z"
          fill="#FFFFFF"
          fill-opacity="1.000000"
          fill-rule="evenodd"
        />
      </svg>
    </UiButton>
  </div>
</template>

<style lang="scss">
  .AnimeRandomCardInfo {
    height: 100%;
    align-self: baseline;
    display: grid;
    gap: 20px;
  }

  .AnimeRandoCardInfo__btn {
    height: max-content;
    width: max-content;
  }

  .AnimeRandomCardInfo__text {
    display: flex;
    flex-direction: column;
  }
</style>
