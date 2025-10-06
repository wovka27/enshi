<script setup lang="ts">
  import AnimeCardRating from '@entities/anime-card-rating/ui';
  import AnimeCardPoster from '@entities/anime-card/ui/AnimeCardPoster.vue';
  import type { IRandomAnime } from '@entities/anime-random/model';
  import AnimeRandomCardInfo from '@entities/anime-random/ui/AnimeRandomCardInfo.vue';

  interface IAnimeRandomCardProps {
    idx: number;
    data: IRandomAnime;
  }

  defineProps<IAnimeRandomCardProps>();
</script>

<template>
  <router-link
    :to="{ name: 'anime_page', params: { id: data.id } }"
    class="AnimeRandomCard"
  >
    <AnimeCardPoster
      class="AnimeRandomCard__poster"
      size="large"
      :img-src="data.screenshots?.[0]"
    >
      <AnimeCardRating
        :pos="idx === 0 ? 'bottom-left' : 'top-right'"
        icon="enshi"
        :type="idx === 0 ? 'large' : 'medium'"
        :value="data.enshi_rating"
      />
    </AnimeCardPoster>
    <AnimeRandomCardInfo
      :id="data.id"
      :idx="idx"
      :title="data.title"
      :year="data.year"
      :episodes-count="data.episodes_count"
      :outline-btn="idx !== 0"
    />
  </router-link>
</template>

<style lang="scss">
  .AnimeRandomCard {
    display: grid;
    grid-column: span 2;

    &:first-child {
      grid-row: span 3;
      grid-column: span 2;

      .AnimeRandomCard__poster {
        grid-row: span 2;
      }
    }

    &:not(&:first-child) {
      grid-template-columns: subgrid;
      gap: 20px;
    }

    grid-template-rows: subgrid;
  }

  .AnimeRandomCard__poster {
    width: 100%;
    height: auto;
  }

  .AnimeRandomCard__info {
    display: flex;
    gap: 20px;

    p {
      font-size: fluid(16, 12);
      line-height: fluid(20, 15);
      color: #767676;

      span {
        color: #fff;
      }
    }
  }
</style>
