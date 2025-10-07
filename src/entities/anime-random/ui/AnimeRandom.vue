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
      <UiIconButton
        :size="40"
        icon-name="reload"
        is-theme
        @click="animeRandomStore.getData"
      />
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
