<script setup lang="ts">
  import { ref, computed, onBeforeUnmount, watch } from 'vue';

  interface Props {
    duration: number;
    currentTime: number;
    buffered: number;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'seek', time: number): void;
    (e: 'onThumbKey', keyEvent: KeyboardEvent): void;
  }>();

  const isHover = ref(false);
  const isDragging = ref(false);
  const isSeeking = ref(false);

  const trackRef = ref<HTMLDivElement>();
  const localCurrentTime = ref(0);

  const progressPercent = computed(() => {
    const time = isDragging.value || isSeeking.value ? localCurrentTime.value : props.currentTime;
    return props.duration > 0 ? (time / props.duration) * 100 : 0;
  });

  const bufferPercent = computed(() => (props.duration > 0 ? (props.buffered / props.duration) * 100 : 0));

  const updateSeek = (e: MouseEvent) => {
    if (!trackRef.value) return;
    const rect = trackRef.value.getBoundingClientRect();
    const offsetX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const percent = offsetX / rect.width;
    localCurrentTime.value = percent * props.duration;
  };

  const onMouseDown = (e: MouseEvent) => {
    isDragging.value = true;
    updateSeek(e);
    window.addEventListener('mousemove', updateSeek);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseUp = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    isSeeking.value = true; // блокируем до подтверждения от плеера
    emit('seek', localCurrentTime.value);

    window.removeEventListener('mousemove', updateSeek);
    window.removeEventListener('mouseup', onMouseUp);
  };

  watch(
    () => props.currentTime,
    (newVal) => {
      if (isSeeking.value) {
        if (Math.abs(newVal - localCurrentTime.value) < 0.5) {
          isSeeking.value = false;
        }
      }
    }
  );

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', updateSeek);
    window.removeEventListener('mouseup', onMouseUp);
  });
</script>

<template>
  <div
    ref="trackRef"
    aria-hidden="false"
    class="timeline"
    :class="{ 'timeline--hover': isHover, 'timeline--dragging': isDragging }"
    @mousedown="onMouseDown"
    @mousemove="isHover = true"
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
  >
    <div
      class="timeline__buffer"
      :style="{ width: bufferPercent + '%' }"
    ></div>
    <div
      class="timeline__progress"
      :style="{ width: progressPercent + '%' }"
    ></div>
    <div
      v-if="isHover || isDragging"
      class="timeline__thumb"
      :style="{ left: progressPercent + '%' }"
      @keydown.stop.prevent="emit('onThumbKey', $event)"
    ></div>
  </div>
</template>

<style lang="scss">
  .timeline {
    --h: 6px;
    width: 100%;
    position: relative;
    flex-grow: 1;
    height: var(--h);
    background: var(--color-gray-82-20);
    border-radius: var(--border-radius-20);
    cursor: pointer;
    transition: height var(--transition-duration) ease;

    &--hover,
    &--dragging {
      --h: 10px;
      background: var(--color-gray-82);
    }

    &__buffer {
      position: absolute;
      height: 100%;
      background: var(--color-gray-82);
      border-radius: inherit;
    }

    &__progress {
      position: absolute;
      height: 100%;
      background: var(--color-purple-8c);
      border-radius: inherit;
    }

    &__thumb {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 200%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: var(--color-white);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
      pointer-events: none;
    }
  }
</style>
