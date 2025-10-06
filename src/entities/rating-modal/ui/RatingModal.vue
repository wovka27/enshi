<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { Swiper as SwiperClass } from 'swiper';
  import { Navigation, Mousewheel } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import BaseModal from '@entities/modal';
  import { useRatingModalStore } from '@entities/rating-modal/model';
  import { declension } from '@shared/lib/utils';

  const ratingModalStore = useRatingModalStore();
  const animeDetailStore = useAnimeDetailStore();

  const modalRef = ref<{ open: () => void; close: () => void } | null>(null);
  const swiperRef = ref<SwiperClass | null>(null);

  const rating = computed(() => animeDetailStore.estimation?.rating ?? 0);
  const voices = computed(() => ({
    value: declension(animeDetailStore.estimation?.voices ?? 0, ['голос', 'голоса', 'голосов']),
    label: animeDetailStore.estimation?.voices ?? 0,
  }));

  const onSlideChange = (swiper: SwiperClass) => {
    ratingModalStore.setRatingValue(swiper.activeIndex + 1);
  };

  const selectRating = (index: number) => {
    swiperRef.value?.slideTo(index);
  };

  const onSwiperInit = (swiper: SwiperClass) => {
    swiperRef.value = swiper;
  };
</script>

<template>
  <BaseModal
    ref="modalRef"
    v-model="ratingModalStore.isOpen"
    title="Ваша оценка"
  >
    <template #body>
      <div class="RatingModal-content">
        <div class="RatingModal-content__info">
          <h3 class="RatingModal-content__h3">
            <span>{{ rating }}</span>
          </h3>
          <p>{{ voices.label }} {{ voices.value }}</p>
        </div>
        <Swiper
          :modules="[Navigation, Mousewheel]"
          :slides-per-view="3"
          centered-slides
          grab-cursor
          effect="cube"
          mousewheel
          :space-between="44"
          :initial-slide="4"
          class="rating-swiper"
          @slide-change="onSlideChange"
          @swiper="onSwiperInit"
        >
          <SwiperSlide
            v-for="(n, index) in 10"
            :key="n"
            class="rating-slide"
            @click="selectRating(index)"
          >
            <span :class="['rating-number', { active: ratingModalStore.ratingValue === n }]">
              {{ n }}
            </span>
          </SwiperSlide>
        </Swiper>
      </div>
    </template>

    <template #footer>
      <UiButton
        class="btn"
        btn-type="primary"
        @click="
          ratingModalStore.changeRating({
            anime_id: animeDetailStore.data?.id,
            estimation: ratingModalStore.ratingValue,
          })
        "
      >
        Поставить оценку
      </UiButton>
    </template>
  </BaseModal>
</template>

<style lang="scss">
  .rating-swiper {
    align-items: center;
    max-width: 180px;
    height: 90px;
  }

  .RatingModal-content__info {
    padding-right: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    border-right: var(--border) var(--color-gray-82);
  }

  .rating-swiper-wrapper {
    width: 100%;
  }

  .RatingModal-content {
    display: grid;
    align-items: center;
    grid-template-columns: max-content 1fr;
    column-gap: 20px;
    text-align: center;
    h3 {
      font-size: fluid(50, 40);
    }

    p {
      color: var(--color-gray-82);
    }
  }

  .rating-slide {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rating-number {
    font-size: 32px;
    font-weight: bold;
    color: var(--color-gray-82-20);
    padding: 10px;
    border-radius: var(--border-radius-10);
    transition: all var(--transition-duration) ease;

    &.active {
      color: var(--color-white);
      transform: scale(1.8);
      background-color: var(--color-gray-82-20);
    }

    &:not(&.active) {
      @include hover {
        color: var(--color-gray-82);
      }
    }
  }

  .rating-actions {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .btn {
    width: 100%;
  }
</style>
