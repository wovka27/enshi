<script setup lang="ts">
  import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';

  const store = useVideoStore();
  defineEmits<{
    (event: 'togglePlay'): void;
    (event: 'prev'): void;
    (event: 'next'): void;
  }>();
</script>

<template>
  <div class="EnshiPlayer-controls__btns">
    <button
      class="EnshiPlayer-controls__btn EnshiPlayer-controls__btn--prev"
      @click="$emit('prev')"
    >
      <UiIcon
        width="38"
        name="skip-prev"
      />
    </button>
    <button
      :aria-pressed="store.isPlaying"
      class="EnshiPlayer-controls__btn EnshiPlayer-controls__btn--play"
      @click="$emit('togglePlay')"
    >
      <UiIcon
        width="38"
        :name="!store.isPlaying ? 'play' : 'pause'"
      />
    </button>
    <button
      class="EnshiPlayer-controls__btn EnshiPlayer-controls__btn--next"
      @click="$emit('next')"
    >
      <UiIcon
        width="38"
        name="skip-next"
      />
    </button>
  </div>
</template>

<style lang="scss">
  .EnshiPlayer-controls__btns {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    column-gap: 20px;
    z-index: 2;
  }

  .EnshiPlayer-controls__btn {
    pointer-events: auto;
    color: var(--color-white);
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    &:not(&--play, &:disabled) {
      @include hover {
        color: var(--color-purple-8c);
      }
    }

    &--play {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--color-purple-8c);
      @include hover {
        svg {
          scale: 1.1;
        }
      }
    }
    &--back,
    &--settings {
      position: absolute;
      top: 0;
    }
    &--back {
      left: 0;
    }
    &--settings {
      right: 0;
    }
    &--volume {
      position: relative;

      &.active .EnshiPlayer-controls__range-input--volume {
        scale: 1;
        width: 93px;
      }
    }
  }
</style>
