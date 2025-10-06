<script setup lang="ts">
  import { ref, onMounted, defineEmits, defineProps } from 'vue';

  // ==== Типы ====
  interface UiVideoProps {
    src: string;
    poster?: string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    width?: number | string;
    height?: number | string;
  }

  interface UiVideoEmits {
    (e: 'loaded'): void;
    (e: 'error', error: string): void;
    (e: 'play'): void;
    (e: 'pause'): void;
    (e: 'ended'): void;
  }

  // ==== Props & Emits ====
  const props = defineProps<UiVideoProps>();
  const emit = defineEmits<UiVideoEmits>();

  // ==== State ====
  const isLoading = ref(true);
  const isError = ref(false);
  const videoRef = ref<HTMLVideoElement | null>(null);

  // ==== Methods ====
  const handleLoaded = () => {
    isLoading.value = false;
    isError.value = false;
    emit('loaded');
  };

  const handleError = () => {
    isLoading.value = false;
    isError.value = true;
    emit('error', 'Не удалось загрузить видео');
  };

  const handlePlay = () => emit('play');
  const handlePause = () => emit('pause');
  const handleEnded = () => emit('ended');

  // Авто-запуск при необходимости
  onMounted(() => {
    if (props.autoplay && videoRef.value) {
      videoRef.value.play().catch(() => {
        // ...
      });
    }
  });
</script>

<template>
  <div class="ui-video">
    <!-- Skeleton Loader -->
    <div
      v-if="isLoading"
      class="ui-video__skeleton"
    >
      <div class="ui-video__skeleton-animate skeleton-animation"></div>
    </div>

    <!-- Ошибка -->
    <div
      v-else-if="isError"
      class="ui-video__error"
    >
      <slot name="error"><UiImage src="/images/banner_fallback.webp" /></slot>
    </div>

    <!-- Видео -->
    <video
      v-show="!isLoading && !isError"
      ref="videoRef"
      class="ui-video__element"
      :width="width"
      :height="height"
      :src="props.src"
      :poster="props.poster"
      :autoplay="props.autoplay"
      :controls="props.controls"
      :loop="props.loop"
      :muted="props.muted"
      :preload="props.preload"
      @loadeddata="handleLoaded"
      @error="handleError"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
    />

    <!-- Кастомные контролы -->
    <slot
      name="controls"
      :video-ref="videoRef"
    />
  </div>
</template>

<style lang="scss">
  .ui-video {
    height: 100%;
    width: 100%;
    position: relative;
    display: block;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
  }

  .ui-video__element {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .ui-video__skeleton {
    width: 100%;
    height: 100%;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ui-video__skeleton-animate {
    width: 100%;
    height: 100%;
  }

  .ui-video__error {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f87171;
    font-size: 14px;
    padding: 10px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
