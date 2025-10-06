<script setup lang="ts">
  import { useAnimeRandomStore } from '@entities/anime-random/model/anime-random.store.ts';
  import AnimeRandomCard from '@entities/anime-random/ui/AnimeRandomCard.vue';

  const animeRandomStore = useAnimeRandomStore();

  animeRandomStore.getData();
</script>

<template>
  <UiSection
    v-if="animeRandomStore.list.length"
    id="random"
    class="AnimeRandomContainer"
    title="Случайные аниме"
    class-content="AnimeRandom"
  >
    <template #header>
      <button
        class="AnimeRandom__update block-container"
        @click="animeRandomStore.getData"
      >
        <svg
          class="AnimeRandom__icon"
          width="18.462891"
          height="18.666656"
          viewBox="0 0 18.4629 18.6667"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M9.33 18.66C8.03 18.66 6.82 18.42 5.69 17.93C4.56 17.44 3.57 16.78 2.73 15.93C1.88 15.09 1.21 14.1 0.73 12.97C0.24 11.84 0 10.62 0 9.33C0 8.04 0.24 6.82 0.73 5.69C1.21 4.56 1.88 3.57 2.73 2.72C3.57 1.88 4.56 1.21 5.69 0.73C6.82 0.24 8.03 0 9.33 0C10.67 0 11.95 0.27 13.16 0.83C14.37 1.38 15.43 2.15 16.33 3.14L16.33 0.94C16.33 0.77 16.38 0.63 16.5 0.52C16.61 0.41 16.75 0.35 16.91 0.35C17.08 0.35 17.22 0.41 17.33 0.52C17.44 0.63 17.5 0.77 17.5 0.94L17.5 4.26C17.5 4.52 17.41 4.75 17.22 4.93C17.04 5.11 16.82 5.2 16.55 5.2L13.23 5.2C13.07 5.2 12.93 5.14 12.82 5.03C12.71 4.92 12.65 4.78 12.65 4.62C12.65 4.45 12.71 4.31 12.82 4.2C12.93 4.09 13.07 4.03 13.23 4.03L15.54 4.03C14.73 3.14 13.79 2.44 12.73 1.93C11.67 1.42 10.54 1.16 9.33 1.16C7.05 1.16 5.12 1.95 3.54 3.54C1.95 5.12 1.16 7.05 1.16 9.33C1.16 11.6 1.95 13.53 3.54 15.12C5.12 16.7 7.05 17.5 9.33 17.5C11.25 17.5 12.95 16.89 14.43 15.69C15.91 14.48 16.86 12.95 17.29 11.1C17.34 10.92 17.43 10.78 17.55 10.69C17.68 10.59 17.82 10.56 17.99 10.58C18.17 10.6 18.3 10.69 18.38 10.83C18.46 10.98 18.48 11.14 18.43 11.31C17.99 13.46 16.92 15.22 15.23 16.6C13.54 17.97 11.57 18.66 9.33 18.66L9.33 18.66Z"
            fill="#B4B4B4"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      </button>
    </template>
    <!--    <template>-->
    <!--      <SkeletonRandomCard-->
    <!--        v-for="i of 4"-->
    <!--        :key="i"-->
    <!--      />-->
    <!--    </template>-->
    <transition-group
      name="fade"
      appear
    >
      <AnimeRandomCard
        v-for="(item, idx) of animeRandomStore.list"
        :key="item.id"
        :data="item"
        :idx="idx"
      />
    </transition-group>
  </UiSection>
</template>

<style lang="scss">
  .AnimeRandom {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: fluid(146, 109);
    grid-column-gap: 20px;
    grid-row-gap: 14px;
  }

  .AnimeRandom__icon_loading {
    animation: rotate 200ms infinite linear;
  }

  .AnimeRandom__update {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;
    @include hover {
      background-color: #37363e;
    }
  }

  @keyframes rotate {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 960deg;
    }
  }

  @media (max-width: 850px) {
    .AnimeRandom {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 146px;
    }
  }
</style>
