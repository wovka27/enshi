<script setup lang="ts">
  import type { Swiper as SwiperClass } from 'swiper';
  import type { SwiperOptions } from 'swiper/types';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { breakpointsMap } from '@shared/ui/ui-carousel/config';

  interface ICarouselProps {
    list: unknown[];
    loop?: SwiperOptions['loop'];
    slides?: SwiperOptions['slidesPerView'];
    space?: SwiperOptions['spaceBetween'];
    breakpoints?: SwiperOptions['breakpoints'];
    autoplay?: SwiperOptions['autoplay'];
    hidePrevButton?: boolean;
    hideNextButton?: boolean;
    isShadow?: boolean;
  }

  withDefaults(defineProps<ICarouselProps>(), {
    slides: 5,
    space: 50,
    loop: false,
    breakpoints: breakpointsMap,
    autoplay: false,
    hideNextButton: false,
    isShadow: true,
  });

  defineEmits<{
    (event: 'end', swiper: unknown): void;
    (event: 'slide', slide: unknown): void;
    (event: 'onSwiper', swiper: SwiperClass): void;
    (event: 'onSlideEnd', swiper: SwiperClass): void;
  }>();

  const uuid = 'carousel-' + crypto.randomUUID();
</script>

<template>
  <div
    v-if="list?.length"
    :id="uuid"
    class="UiCarousel"
    :class="{ 'is-shadow': isShadow }"
  >
    <Swiper
      :slides-per-view="slides"
      :space-between="space"
      :loop="loop"
      :breakpoints="breakpoints"
      grab-cursor
      :autoplay="autoplay"
      @swiper="$emit('onSwiper', $event)"
      @slide-change-transition-end="$emit('onSlideEnd', $event)"
    >
      <UiCarouselPrevSlide
        v-if="!hidePrevButton"
        :id="`#${uuid}`"
      />
      <SwiperSlide
        v-for="(item, index) of list"
        :key="item.id"
      >
        <slot
          :item="item"
          :index="index"
        />
      </SwiperSlide>
      <UiCarouselNextSlide
        v-if="list.length > 4 && !hideNextButton"
        :id="`#${uuid}`"
      />
    </Swiper>
  </div>
</template>

<style lang="scss">
  .UiCarousel {
    position: relative;

    &.is-shadow {
      &:before,
      &:after {
        pointer-events: none;
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        width: 10%;
        z-index: 2;
      }
      &:before {
        left: 0;
        background: linear-gradient(to right, var(--theme-bg) 0%, transparent 100%);
        width: 0;
      }
      &:after {
        right: 0;
        background: linear-gradient(to left, var(--theme-bg) 0%, transparent 100%);
      }
    }
  }
</style>
