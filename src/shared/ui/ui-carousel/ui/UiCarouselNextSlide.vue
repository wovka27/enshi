<script setup lang="ts">
  import { useSwiper } from 'swiper/vue';

  defineProps<{ id: string }>();
  const swiper = useSwiper();
</script>

<template>
  <teleport
    defer
    :to="id"
  >
    <div class="UiCarouselNextSlide">
      <button @click="swiper.slideNext()">
        <UiIcon
          width="28"
          name="arrow-right"
        />
      </button>
    </div>
  </teleport>
</template>

<style lang="scss">
  .UiCarouselNextSlide {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -30px;
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
