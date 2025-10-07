<script setup lang="ts">
  import { ref, computed, onBeforeUnmount } from 'vue';

  const volume = defineModel<number>({ default: 1 });

  const isOpen = ref(false);
  const sliderRef = ref<HTMLElement | null>(null);
  const wrapperRef = ref<HTMLElement | null>(null);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const icon = computed(() => {
    if (volume.value === 0) return 'volume-off';
    if (volume.value <= 0.5) return 'volume-middle';
    return 'volume-up';
  });

  const startDrag = (e: MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    updateVolume(e);
  };

  const onDrag = (e: MouseEvent) => {
    updateVolume(e);
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  };

  const updateVolume = (e: MouseEvent) => {
    const slider = sliderRef.value;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percent = 1 - Math.min(Math.max(y / rect.height, 0), 1);
    volume.value = percent;
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!isOpen.value) return;
    const el = wrapperRef.value;
    if (el && !el.contains(e.target as Node)) {
      isOpen.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);
  onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div
    ref="wrapperRef"
    class="volume-control hidden-mobile-s"
  >
    <button
      class="volume-control__btn"
      @click="toggle"
    >
      <UiIcon :name="icon" />
    </button>

    <div
      v-if="isOpen"
      class="volume-control__slider-wrap"
    >
      <div
        ref="sliderRef"
        class="slider"
        @mousedown="startDrag"
      >
        <div class="slider__track"></div>
        <div
          class="slider__fill"
          :style="{ height: volume * 100 + '%' }"
        ></div>
        <div
          class="slider__thumb"
          :style="{ bottom: volume * 100 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .volume-control {
    position: relative;
    display: inline-block;

    &__btn {
      width: 48px;
      display: block;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      svg {
        width: inherit;
      }
    }

    &__slider-wrap {
      width: inherit;
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      height: 93px;
      display: flex;
      align-items: center;
    }
  }

  .slider {
    position: relative;
    width: 6px;
    height: 93px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;

    &__track {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }

    &__fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(140, 83, 253, 1), rgba(140, 83, 253, 0.8));
      border-radius: 2px;
    }

    &__thumb {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      cursor: grab;
    }
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.25s ease;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
