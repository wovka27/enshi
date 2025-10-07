<script setup lang="ts">
  import { useSwiper } from 'swiper/vue';

  defineProps<{ id: number }>();
  const swiper = useSwiper();
</script>

<template>
  <teleport
    defer
    :to="id"
  >
    <div class="UiCarouselPrevSlide">
      <button @click="swiper.slidePrev()">
        <UiIcon
          width="28"
          name="arrow-left"
        />
      </button>
    </div>
  </teleport>
</template>

<style lang="scss">
  .UiCarouselPrevSlide {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -30px;
    z-index: 1;

    button {
      color: var(--theme-text);
      padding: 0;
      border: none;
      outline: none;
      background: none;
    }
  }
</style>
