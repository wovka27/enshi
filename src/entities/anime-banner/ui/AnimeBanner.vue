<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { Swiper as SwiperClass } from 'swiper';
  import { breakpointsMap } from '@entities/anime-banner/config';
  import { type IAnimeBannerSlide, useAnimeBannerStore } from '@entities/anime-banner/model';
  import AnimeCardPoster from '@entities/anime-card/ui/AnimeCardPoster.vue';
  import AnimeMeta from '@entities/anime-meta';

  const animeBannerStore = useAnimeBannerStore();

  const index = ref<number>(0);

  const slide = computed<IAnimeBannerSlide | null>(() => animeBannerStore.list?.[index.value] ?? null);
  const slides = computed(() => animeBannerStore.list);

  const onSlideEnd = (instance: SwiperClass): void => {
    index.value = instance.realIndex;
  };

  const meta = computed(() => {
    const anime = slide.value?.anime;
    const episodes =
      anime?.episodes_aired && anime?.episodes_total ? anime?.episodes_aired + '/' + anime?.episodes_total : '';
    const genres = Array.isArray(anime?.anime_genres || [])
      ? anime?.anime_genres.slice(0, 2).join('/')
      : anime?.anime_genres;

    return {
      Год: anime?.year ? anime.year + ' г.' : '',
      Эпизоды: episodes,
      Жанр: genres,
    };
  });

  animeBannerStore.getData();
</script>

<template>
  <section
    id="anime-banner"
    aria-labelledby="anime-banner-title"
    class="AnimeBanner"
  >
    <div class="AnimeBanner__bg">
      <UiVideo
        :key="slide?.slide_url"
        width="100%"
        height="568"
        autoplay
        muted
        preload="auto"
        :src="slide?.slide_url || ''"
        loop
        poster="/images/banner_fallback.webp"
      />
    </div>
    <div
      v-if="slide"
      class="AnimeBanner__content container"
    >
      <h1
        id="anime-banner-title"
        class="AnimeBanner__title"
      >
        {{ slide?.anime.title }}
      </h1>
      <AnimeMeta
        size="medium"
        :data="meta"
      />
      <p
        v-if="slide?.anime.description"
        class="AnimeBanner__description"
      >
        {{ slide?.anime.description }}
      </p>
      <UiButton
        style="margin-top: 30px; width: max-content"
        btn-type="primary"
        :to="{ name: 'anime_page', params: { id: slide.anime_id } }"
      >
        <span style="display: inline-flex; align-items: center">
          Смотреть
          <UiIcon
            width="30"
            name="arrow-right"
          />
        </span>
      </UiButton>
    </div>
    <div
      v-if="slides.length"
      class="AnimeBanner__carousel"
    >
      <UiCarousel
        :slides="4"
        :space="60"
        :list="slides"
        :breakpoints="breakpointsMap"
        :is-shadow="false"
        autoplay
        loop
        @on-slide-end="onSlideEnd"
      >
        <template #default="{ item }">
          <AnimeCardPoster :img-src="item!.anime.poster_url" />
        </template>
      </UiCarousel>
    </div>
  </section>
</template>

<style lang="scss">
  .AnimeBanner {
    overflow: hidden;
    position: relative;
    min-height: fluid(738, 591);
    padding-top: fluid(235, 103);
    margin-bottom: fluid(60, 40);
    background-color: var(--theme-bg);
  }

  .AnimeBanner__carousel {
    position: absolute;
    bottom: 0;
    left: 50%;
    right: 0;

    @include laptop {
      position: inherit;
      bottom: inherit;
      right: inherit;
      left: inherit;
      margin-top: 54px;
    }
  }

  .AnimeBanner__content {
    position: relative;
    z-index: 1;
  }

  .AnimeBanner__title {
    max-width: 500px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 15px;
  }

  .AnimeBanner__description {
    margin-top: 30px;
    max-width: 505px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }

  .AnimeBanner__bg {
    z-index: 0;
    position: absolute;
    inset: 0;
    //background-image: url(/images/banner_fallback.webp);
    //background-size: cover;
    //background-repeat: no-repeat;
    //background-position: center center;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(to right, #000 0, transparent 100%);
      z-index: 1;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: -1;
    }
  }
</style>
