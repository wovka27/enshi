<script setup lang="ts">
  import EnshiPlayerFooter from '@entities/enshi-player/ui/EnshiPlayerFooter.vue';
  import EnshiPlayerPlayControl from '@entities/enshi-player/ui/EnshiPlayerPlayControl.vue';

  defineProps<{
    isShow: boolean;
    meta: {
      title: string;
      episodeNumber: string;
    };
  }>();

  defineEmits<{
    (event: 'seek', value: number): void;
    (event: 'next'): void;
    (event: 'prev'): void;
    (event: 'togglePip'): void;
    (event: 'toggleFullscreen'): void;
    (event: 'togglePlay'): void;
    (event: 'thumb', value: KeyboardEvent): void;
    (event: 'volume', value: number): void;
  }>();
</script>

<template>
  <div
    class="EnshiPlayer-controls-container"
    :class="{ 'EnshiPlayer-controls-container--hidden': !isShow }"
  >
    <div
      class="EnshiPlayer-controls"
      @click.self="$emit('togglePlay')"
      @dblclick.self="$emit('toggleFullscreen')"
    >
      <EnshiPlayerPlayControl
        @toggle-play="$emit('togglePlay')"
        @next="$emit('next')"
        @prev="$emit('prev')"
      />
      <EnshiPlayerFooter
        :meta="meta"
        @seek="$emit('seek', $event)"
        @thumb="$emit('thumb', $event)"
        @toggle-fullscreen="$emit('toggleFullscreen')"
        @toggle-pip="$emit('togglePip')"
        @volume="$emit('volume', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .EnshiPlayer-controls-container {
    position: absolute;
    inset: 0;
    padding: 30px;
    background: linear-gradient(to right, rgba(0, 0, 0) 0%, transparent 90%);
    transition-duration: var(--transition-duration);
    transition-property: all;
    opacity: 0;
    z-index: 1;

    &--hidden {
      cursor: none;
      opacity: 0 !important;
    }

    @include mobile-s {
      padding: 10px;
    }
  }

  .EnshiPlayer-controls {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
